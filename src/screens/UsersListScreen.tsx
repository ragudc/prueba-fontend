import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';
import {
  fetchUsers,
  setAllUsers,
  selectUsers,        // <- nuevos selectores del slice
  selectLoading,
  selectError,
  User,
} from '../store/usersSlice';
import { AppDispatch } from '../store';

/* ---------- tipos de navegación ---------- */
type Props = NativeStackScreenProps<RootStackParamList, 'UserList'>;

/* ---------- styled components ---------- */
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${p => p.theme.background};
`;

const SearchInput = styled.TextInput`
  padding: 8px 12px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: ${p => p.theme.text};
  background-color: ${p => p.theme.cardBackground};
`;

const UserItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  background-color: ${p => p.theme.cardBackground};
`;

const Avatar = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 12px;
`;

const UserInfo = styled(View)`
  flex: 1;
`;

const UserName = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${p => p.theme.text};
`;

const UserEmail = styled(Text)`
  font-size: 14px;
  color: ${p => p.theme.textSecondary};
`;

const Centered = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled(UserName)`
  color: red;
  margin-bottom: 8px;
`;

const listContentContainer = { paddingBottom: 20 };

/* ---------- componente ---------- */
const UsersListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

  /* estado global vía selectores exportados */
  const users   = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error   = useSelector(selectError);

  const [search, setSearch] = useState('');
  const hasRunRef = useRef(false); // evita doble ejecución en Strict Mode

  /* carga inicial (caché + red) */
  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const init = async () => {
      try {
        const cached = await AsyncStorage.getItem('users_cache');
        if (cached) {
          dispatch(setAllUsers(JSON.parse(cached) as User[]));
          return; // ya tenemos datos, no llamamos a la red
        }
      } catch {
        /* ignore cache errors */
      }
      dispatch(fetchUsers()); // una sola llamada, la API son 10 usuarios
    };

    init();
  }, [dispatch]);

  /* búsqueda local */
  const filtered = users.filter((u: User) =>
    `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase()),
  );

  /* render de fila */
  const renderItem: ListRenderItem<User> = ({ item }) => (
    <UserItem onPress={() => navigation.navigate('UserDetails', { user: item })}>
      <Avatar source={{ uri: `https://i.pravatar.cc/150?u=${item.id}` }} />
      <UserInfo>
        <UserName>{item.name}</UserName>
        <UserEmail>{item.email}</UserEmail>
      </UserInfo>
    </UserItem>
  );

  /* error inicial */
  if (error && users.length === 0) {
    return (
      <Centered>
        <ErrorText>{error}</ErrorText>
      </Centered>
    );
  }

  /* pantalla en blanco mientras carga la primera vez */
  if (loading && users.length === 0) {
    return <Container />; // sin spinner: se muestra lista en cuanto llegue
  }

  /* UI principal */
  return (
    <Container>
      <SearchInput
        placeholder="Buscar por nombre o email…"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={u => u.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={listContentContainer}
      />
    </Container>
  );
};

export default UsersListScreen;
