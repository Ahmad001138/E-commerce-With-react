import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      dispatch(login({ username }));
      setSnackbar({ open: true, message: '✅ Login successful!', severity: 'success' });
      navigate('/');
    } else {
      const usernameExists = users.some((user) => user.username === username);

      if (usernameExists) {
        setSnackbar({ open: true, message: '❌ Incorrect password', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: `${username} is not registered`, severity: 'error' });
      }

      setUsername('');
      setPassword('');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#d14200] to-[#f9f4f1] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Welcome Back 👋</h2>
        <p className="text-center text-gray-500 text-sm">Login to your account</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />

        <div className="text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-red-500 font-medium hover:underline">
            Register
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-3 rounded-xl hover:bg-red-700 transition"
        >
          Login
        </button>
      </form>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );

};

export default Login;
