import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../assets/Image.png';
import { useSelector, useDispatch } from 'react-redux';
import {
  Drawer, Typography, Box, IconButton, Snackbar, Alert, TextField, Button
} from '@mui/material';
import { addToCart } from '../features/cartSlice';
import CloseIcon from '@mui/icons-material/Close';

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);

  const [cartItems, setCartItems] = React.useState([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [orderSuccess, setOrderSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', phone: '', address: '' });
  const [formErrors, setFormErrors] = React.useState({});

  const handleAdd = (item) => {
    dispatch(addToCart(item));
  };

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    setIsCartOpen(true);
    const exists = cartItems.find(i => i.id === item.id);
    if (exists) {
      setCartItems(prev =>
        prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      );
    } else {
      setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (id, type) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: type === 'inc' ? item.quantity + 1 : item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.address) errors.address = 'Address is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setOrderSuccess(true);
    setCartItems([]);
    setFormData({ name: '', phone: '', address: '' });
    setIsCartOpen(false);
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-orange-700 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-12">
        <div className="text-center md:text-left space-y-6 px-4">
          <p className="text-sm uppercase font-medium text-orange-100">New Arrivals Only</p>
          <h1 className="text-5xl font-extrabold text-white leading-tight">
            New <span className="inline-block animate-bounce">👋</span><br />
            Collections<br />
            <span className="text-orange-100">For Everyone</span>
          </h1>
          <button
            onClick={() => navigate('/products')}
            className="mt-6 bg-white text-orange-700 py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-100 transition"
          >
            Explore Latest Collection →
          </button>
          {isAuthenticated && (
            <p className="text-white mt-4">Welcome, {username || 'Guest'}</p>
          )}
        </div>

        <div className="flex justify-center px-4">
          <img
            src={HeroImage}
            alt="Hero"
            className="w-full max-w-md md:max-w-xl object-contain drop-shadow-2xl"
          />
        </div>

        
        <Drawer anchor="right" open={isCartOpen} onClose={handleCartClick}>
          <Box sx={{ width: 350, p: 2, height: '100%', position: 'relative', overflow: 'hidden' }}>
            {/* ✅ Close Icon on Top Left */}
            <Box sx={{ color:'red', position: 'absolute', top: 8, left: 3, zIndex: 10 }}>
              <IconButton onClick={handleCartClick}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ mt: 5, height: '100%' }}>
              <Typography variant="h6" className="mb-4">Your Cart</Typography>

              {cartItems.length === 0 ? (
                <Typography variant="body2">Your cart is empty.</Typography>
              ) : (
                <div className="flex flex-col gap-4 pr-2">
                  {/* ✅ Cart Items */}
                  {cartItems.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        borderBottom: '1px solid #ccc',
                        pb: 1,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 60,
                          height: 90,
                          objectFit: 'cover',
                          borderRadius: 6,
                        }}
                      />
                      <div className="flex flex-col flex-1">
                        <Typography variant="body1">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Qty: {item.quantity}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          Rs. {item.price * item.quantity}
                        </Typography>
                      </div>
                    </Box>
                  ))}

                 
                  <Box className="pt-2 border-t mt-4">
                    <Typography variant="subtitle1" fontWeight="bold">
                      Total: Rs.{" "}
                      {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                    </Typography>
                  </Box>

                  
                  <form onSubmit={handlePlaceOrder} className="space-y-4 mt-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Full Name"
                        className="w-full border px-3 py-2 rounded-md"
                      />
                      {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                    </div>

                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="Phone Number"
                        pattern="[0-9]{10,15}"
                        title="Phone number must be 10 to 15 digits"
                        className="w-full border px-3 py-2 rounded-md"
                      />
                      {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                    </div>

                    <div>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                        placeholder="Delivery Address"
                        className="w-full border px-3 py-2 rounded-md"
                      />
                      {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
                    >
                      Place Order
                    </button>
                  </form>
                </div>
              )}
            </Box>
          </Box>
        </Drawer>




        <Snackbar
          open={orderSuccess}
          autoHideDuration={3000}
          onClose={() => setOrderSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setOrderSuccess(false)} severity="success" sx={{ width: '100%' }}>
            🎉 Order Placed Successfully!
          </Alert>
        </Snackbar>
      </div>
    </section>
  );
};

export default Shop;
