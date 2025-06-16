import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import 'styled-components/native';
//import { User } from '../store/usersSlice';

type UserDetailsProps = NativeStackScreenProps<RootStackParamList, 'UserDetails'>;

declare module 'styled-components/native' {
  export interface DefaultTheme {
    background: string;
    text: string;
    textSecondary: string;
    cardBackground: string;
  }
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.background};
`;
const Card = styled(Animated.View)`
  background-color: ${props => props.theme.cardBackground};
  margin: 16px;
  padding: 20px;
  border-radius: 12px;
  /* Sombra para Android */
  elevation: 4;
  /* Sombra para iOS */
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-offset: 0px 2px;
  shadow-radius: 4px;
`;
const AvatarLarge = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  align-self: center;
  margin-bottom: 16px;
`;
const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.text};
  margin-bottom: 8px;
`;
const Email = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 16px;
`;
const InfoText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.text};
  margin-bottom: 8px;
`;
const BackButton = styled.Button``;  // Utilizamos Button nativo para simplicidad

const StyledScrollView = styled.ScrollView`
  padding-vertical: 20px;
`;

const UserDetailsScreen: React.FC<UserDetailsProps> = ({ route, navigation }) => {
  const { user } = route.params;  // Obtenemos el usuario pasado como parámetro
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animar la aparición de la tarjeta de detalles
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  // Construir texto de dirección formateada
  const { street, suite, city, zipcode } = user.address;
  const fullAddress = `${street}, ${suite}, ${city}, ${zipcode}`;

  return (
    <Container>
      <StyledScrollView>
        <Card style={{ opacity }}>
          {/* Avatar grande */}
          <AvatarLarge source={{ uri: `https://i.pravatar.cc/150?u=${user.id}` }} />
          {/* Nombre y email */}
          <Name>{user.name}</Name>
          <Email>{user.email}</Email>
          {/* Teléfono */}
          <InfoText>📞 Teléfono: {user.phone}</InfoText>
          {/* Dirección */}
          <InfoText>🏠 Dirección: {fullAddress}</InfoText>
          {/* Empresa */}
          <InfoText>🏢 Empresa: {user.company.name}</InfoText>
        </Card>
        {/* Botón regresar (opcional, ya que el header del StackNavigator tiene uno) */}
        <BackButton title="Regresar" onPress={() => navigation.goBack()} />
      </StyledScrollView>
    </Container>
  );
};

export default UserDetailsScreen;
