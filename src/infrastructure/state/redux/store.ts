import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './slices/catalogSlice';
import cartReducer from './slices/cartSlice';
import notificationsReducer from './slices/notificationsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    cart: cartReducer,
    notifications: notificationsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
