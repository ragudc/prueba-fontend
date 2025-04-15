// src/screens/HomeScreen.tsx
import React, { useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
// (Crea un archivo src/utils/reduxHooks.ts con useAppDispatch, useAppSelector)
import { fetchUsers } from "../store/userSlice";
import UserCard from "../components/UserCard";

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserPress = (userId: number) => {
    navigation.navigate("Detail", { userId });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="text-lg mt-2">Cargando usuarios...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUserPress(item.id)}>
            <UserCard
              name={item.name}
              email={item.email}
              // Podemos pasar un avatar genérico
              avatarUrl="https://via.placeholder.com/150"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
