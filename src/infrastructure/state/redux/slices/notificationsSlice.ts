import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from '../../../../core/domain/notification/entities/Notification';
import { mockNotifications } from '../../../data/mockData';

interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  items: mockNotifications,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.items.find((n) => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.items.unshift(action.payload);
    },
  },
});

// Selectors
export const selectNotifications = (state: { notifications: NotificationsState }): Notification[] => 
  state.notifications.items;

export const selectUnreadCount = (state: { notifications: NotificationsState }): number => 
  state.notifications.items.filter((n) => !n.read).length;

export const { markAsRead, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
