import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import { Womenlist } from '../items/Womensitem';

const Women = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('lastVisitedPage', '/women');
  }, []);

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }
    dispatch(addToCart(item));
    alert(`${item.name} added to cart ✅`);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  return (
    <div className="px-4 sm:px-6 py-10 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide">Women’s Clothing Collection</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Explore our beautiful selection of women’s wear.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {Womenlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md group overflow-hidden hover:shadow-lg transition-shadow duration-300"
            style={{ height: '400px', cursor: 'pointer' }}
            onClick={() => handleCardClick(item)}
          >
            <div className="relative h-full">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                <h3 className="text-sm font-semibold truncate px-2">{item.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 0,
            width: { xs: 320, sm: 500, md: 650 },
            borderRadius: 2,
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh',
          }}
        >
         
          <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 2 }}>
            <IconButton onClick={() => setOpen(false)} sx={{ mr: 'auto' }}>
              <CloseIcon />
            </IconButton>
          </Box>

        
          <Box sx={{ overflowY: 'auto', px: 3, pb: 3 }}>
            {selectedItem && (
              <>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-110 object-cover mb-4 rounded"
                />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {selectedItem.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Price:</strong> Rs. {selectedItem.price}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Description:</strong> This beautifully designed women’s dress offers elegance, comfort, and style. Suitable for casual outings or festive gatherings.
                </Typography>
                <button
                  className="bg-orange-600 text-white w-full py-2 rounded hover:bg-orange-700 transition"
                  onClick={() => handleAddToCart(selectedItem)}
                >
                  Add to Cart
                </button>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Women;
