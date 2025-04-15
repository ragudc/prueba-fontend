// src/screens/DetailScreen.tsx
import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../utils/reduxHooks";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const DetailScreen = () => {
  const route = useRoute<DetailScreenProps["route"]>();
  const navigation = useNavigation<DetailScreenProps["navigation"]>();

  const { userId } = route.params;
  const user = useAppSelector((state) =>
    state.user.users.find((u) => u.id === userId)
  );

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">Usuario no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-2">{user.name}</Text>
      <Text className="text-base mb-1">Correo: {user.email}</Text>
      <Text className="text-base mb-1">Teléfono: {user.phone}</Text>
      <Text className="text-base mb-1">Empresa: {user.company.name}</Text>
      <Text className="text-base mb-1">
        Dirección: {user.address.street}, {user.address.city}
      </Text>
      <Text className="text-base mb-1"> Sitio Web: {user.website}</Text>

      <View className="mt-4">
        <Button title="Regresar" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
