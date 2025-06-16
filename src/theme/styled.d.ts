import 'styled-components';

declare module 'styled-components' {
  // 💡 Aquí describes exactamente las claves que vas a usar en la app
  export interface DefaultTheme {
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
  }
}
