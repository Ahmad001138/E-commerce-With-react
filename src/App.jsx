import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './Navbar/Navbar';
import Shop from './Pages/Shop';
import Products from './components/Products';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/register'];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* ✅ Conditionally show Navbar */}
      {!hideNavbar && isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            isAuthenticated ? <Shop /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/products"
          element={
            isAuthenticated ? <Products /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
