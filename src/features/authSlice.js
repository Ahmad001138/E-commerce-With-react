// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';


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

      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', action.payload.username);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.username = '';

      
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
