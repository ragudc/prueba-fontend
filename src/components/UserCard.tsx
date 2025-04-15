// src/components/UserCard.tsx
import React from "react";
import { View, Text, Image } from "react-native";

interface UserCardProps {
  name: string;
  email: string;
  avatarUrl: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, avatarUrl }) => {
  return (
    <View className="flex-row items-center p-4 border-b border-gray-200">
      <Image
        source={{ uri: avatarUrl }}
        className="w-12 h-12 rounded-full mr-4"
      />
      <View>
        <Text className="text-lg font-semibold">{name}</Text>
        <Text className="text-gray-500">{email}</Text>
      </View>
    </View>
  );
};

export default UserCard;
