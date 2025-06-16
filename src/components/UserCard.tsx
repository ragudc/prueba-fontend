import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type User = {
  id: number;
  name: string;
  email: string;
  // Puedes agregar otros campos según la API (username, phone, etc.)
};

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff', // blanco por defecto; ajustable según tema
    // Ejemplo de sombra para iOS:
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    // Elevación para Android:
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
});

export default UserCard;
