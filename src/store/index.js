import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import { persistMiddleware } from './middleware/persistMiddleware';

// Load persisted auth state
const persistedAuthState = typeof window !== 'undefined' 
  ? JSON.parse(localStorage.getItem('authState')) || undefined
  : undefined;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
  preloadedState: {
    auth: persistedAuthState
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(persistMiddleware),
});
