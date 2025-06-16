// src/navigation/AppNavigator.tsx
import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersListScreen from '../screens/UsersListScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import { User } from '../store/usersSlice';

export type RootStackParamList = {
  UserList: undefined;
  UserDetails: { user: User };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const scheme = useColorScheme();
  const navigationTheme = scheme === 'dark' ? NavDarkTheme : NavDefaultTheme;
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen
          name="UserList"
          component={UsersListScreen}
          options={{ title: 'Usuarios', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={{ title: 'Detalle de Usuario', headerTitleAlign: 'center' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
