import React, { useState } from 'react';
import { Menulist } from '../items/Items';
import { Button, Modal, Box, Typography, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import CloseIcon from '@mui/icons-material/Close';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
    <div className="px-4 py-8 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-8">Browse Our Collection</h2>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Menulist.map((item) => (
          <div
            key={item.id}
            className="relative group cursor-pointer overflow-hidden rounded-md shadow-md"
            onClick={() => handleCardClick(item)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
              <p className="text-sm font-semibold">{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ MODAL FOR DETAILS */}
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
          {/* ✅ Close Button on the LEFT */}
          <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 2 }}>
            <IconButton onClick={() => setOpen(false)} sx={{ mr: 'auto' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* ✅ Scrollable content */}
          <Box
            sx={{
              overflowY: 'auto',
              px: 3,
              pb: 3,
              pt: 0,
            }}
          >
            {selectedItem && (
              <>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-100 object-cover mb-4 rounded"
                />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {selectedItem.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Price:</strong> Rs. {selectedItem.price}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Description:</strong> This dress is made from premium quality
                  fabric, perfect for both casual and formal occasions. Designed for comfort
                  and style, it's a must-have in your wardrobe. The stitching is elegant and the
                  fit is tailored to flatter any body type. Available in multiple sizes and
                  colors. Wear it to a party, wedding, or even casually — it fits all.
                </Typography>
                <button
                  className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-700 transition"
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

export default Products;
