import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../../../core/domain/user/entities/User';
import { mockUser } from '../../../data/mockData';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: mockUser,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
});

// Selectors
export const selectUser = (state: { user: UserState }): User | null => 
  state.user.user;

export const { logout } = userSlice.actions;
export default userSlice.reducer;
