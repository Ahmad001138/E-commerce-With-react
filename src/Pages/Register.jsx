// src/pages/Register.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (username.length < 4) newErrors.username = 'Username must be at least 4 characters.';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const userExists = existingUsers.some((user) => user.username === username);

    if (userExists) {
      setSnackbar({
        open: true,
        message: '❌ Username already exists!',
        severity: 'error',
      });
      return;
    }

    const newUser = { username, password };
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    setSnackbar({
      open: true,
      message: '✅ Registered successfully! Redirecting...',
      severity: 'success',
    });

    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#d14200] to-[#f9f4f1] px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white px-6 py-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md space-y-5"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Create Account 👤</h2>
        <p className="text-center text-gray-500 text-sm">Register to get started</p>

        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-red-500 font-medium hover:underline">
            Login
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-3 rounded-xl hover:bg-red-700 transition"
        >
          Register
        </button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
