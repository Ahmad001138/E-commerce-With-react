import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/shop');
    }

  }, [isAuthenticated, navigate]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (username.length < 4) newErrors.username = 'Enter at least 4 characters (username or email).';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const matchedUser = users.find(
      (user) =>
        (user.username === username || user.email === username) &&
        user.password === password
    );

    if (matchedUser) {
      dispatch(login({ username: matchedUser.username }));
      setSnackbar({ open: true, message: '✅ Login successful!', severity: 'success' });

      setTimeout(() => {
        navigate('/shop');
      }, 1500);
    } else {
      setSnackbar({ open: true, message: '❌ Invalid username/email or password', severity: 'error' });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#d14200] to-[#f9f4f1] px-4">
        <div className="w-full max-w-sm sm:max-w-md">
          <form
            onSubmit={handleLogin}
            className="bg-white px-4 py-6 sm:p-10 rounded-2xl shadow-xl w-full space-y-6 border border-red-100"
          >
            <h2 className="text-3xl font-extrabold text-center text-gray-800">Welcome</h2>
            <p className="text-center text-gray-500 text-sm">Login to your account</p>

            <div>
              <input
                type="text"
                placeholder="Username / Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
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
                className="w-full p-3 h-12 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

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
        </div>

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
    </>
  );
};

export default Login;
