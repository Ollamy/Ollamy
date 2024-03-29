import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'src/store';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
} as { user: null | User; token: string | null; isAuthenticated: boolean };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    login: () => ({
      ...initialState,
      isAuthenticated: true,
    }),
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;
