import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from './src/store';
import { lightTheme, darkTheme } from './src/theme/themes';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  const scheme = useColorScheme();  // 'dark' | 'light'
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
};
export default App;
