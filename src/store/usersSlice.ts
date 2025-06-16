import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../services/api';

/* ---------- Interfaces que dependen de la respuesta JSON ---------- */
interface Geo {
  lat: string;
  lng: string;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase:
  string; bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

/* ---------- Estado ---------- */
interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

/* ---------- Thunk asíncrono ---------- */
export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const resp = await fetch(`${BASE_URL}/users`);
    if (!resp.ok) {
      return rejectWithValue(`Error ${resp.status}: no se pudieron obtener los usuarios.`);
    }
    const data: User[] = await resp.json();
    await AsyncStorage.setItem('users_cache', JSON.stringify(data));
    return data;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? 'Error de red');
  }
});

/* ---------- Slice ---------- */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /** Cargar usuarios desde caché u otra fuente */
    setAllUsers(state, action: PayloadAction<User[]>) {
      state.users   = action.payload;
      state.loading = false;
      state.error   = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending,  state => { state.loading = true;  state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users   = payload;
        state.error   = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload ?? action.error.message ?? 'Error desconocido';
      });
  },
});

/* ---------- Selectors exportados ---------- */
export const selectUsers   = (root: { users: UsersState }) => root.users.users;
export const selectLoading = (root: { users: UsersState }) => root.users.loading;
export const selectError   = (root: { users: UsersState }) => root.users.error;

/* ---------- Exportaciones ---------- */
export const { setAllUsers } = usersSlice.actions;
export default usersSlice.reducer;
