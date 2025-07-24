// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load persisted auth state from localStorage
const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
const storedUsername = localStorage.getItem('username') || '';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: storedAuth,
    username: storedUsername,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;

      // Persist to localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', action.payload.username);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.username = '';

      // Clear from localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
