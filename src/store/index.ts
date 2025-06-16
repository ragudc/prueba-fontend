import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
// (Si hubiera themeSlice: import themeReducer from './themeSlice';)

export const store = configureStore({
  reducer: {
    users: usersReducer,
    // theme: themeReducer, (ejemplo si se define)
  },
});

// Tipos derivados útiles para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
