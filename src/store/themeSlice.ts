import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false, // modo claro por defecto
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state:any) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state:any, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleTheme, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
