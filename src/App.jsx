import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store'; // make sure this is exported from your store

import Navbar from './Navbar/Navbar';
import Shop from './Pages/Shop';
import Products from './components/Products';
import Men from './components/Men';
import Women from './components/Women';
import Login from './pages/Login';
import Register from './pages/Register';
import Kids from './components/Kids';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/register'];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <PersistGate loading={null} persistor={persistor}>
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
        <Route
          path="/men"
          element={
            isAuthenticated ? <Men /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/women"
          element={
            isAuthenticated ? <Women /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/kids"
          element={
            isAuthenticated ? <Kids /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </PersistGate>
  );
}

export default App;
