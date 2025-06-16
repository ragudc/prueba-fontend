import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';

import UsersListScreen from '../screens/UsersListScreen';
import { lightTheme } from '../theme/themes';
import { store } from '../store';

test('render sin crash', () => {
  /* mocks simples */
  const mockNavigation = {} as any;
  const mockRoute = { key: 'UserList', name: 'UserList', params: undefined } as any;

  render(
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <UsersListScreen
          navigation={mockNavigation}
          route={mockRoute}     /* ← añadido: cumple el tipo */
        />
      </ThemeProvider>
    </Provider>,
  );
});
