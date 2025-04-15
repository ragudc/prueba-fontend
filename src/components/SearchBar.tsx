// src/components/SearchBar.tsx
import React, { useState } from "react";
import { View, TextInput } from "react-native";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (text: string) => {
    setSearchTerm(text);
    onSearch(text);
  };

  return (
    <View className="px-4 py-2 bg-white border-b border-gray-200">
      <TextInput
        placeholder="Buscar por nombre o email..."
        value={searchTerm}
        onChangeText={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2"
      />
    </View>
  );
};

export default SearchBar;
