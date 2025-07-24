import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';

const Kids = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching:', err));
  }, []);

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }
    dispatch(addToCart(item));
    alert(`${item.title} added to cart ✅`);
  };

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="px-4 sm:px-6 py-10 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Fashion</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Explore fun and comfortable clothing for all. Tap a product to see more!
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpen(item)}
            className="bg-white rounded-xl shadow-sm overflow-hidden text-center group relative cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[280px] object-contain transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay product name on image */}
              <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-sm font-medium py-1">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Drawer */}
      <Dialog open={openModal} onClose={handleClose} maxWidth="md" fullWidth>
        {selectedItem && (
          <div className="relative bg-white flex flex-col md:flex-row w-full max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <IconButton
              onClick={handleClose}
              className=" top-2  z-10 bg-white"
              size="small"
            >
              <CloseIcon />
            </IconButton>

            {/* Image section */}
            <div className="flex-1 p-4 flex justify-center items-center border-b md:border-b-0 md:border-r">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[300px] object-contain"
              />
            </div>

            {/* Content section */}
            <div className="flex-1 p-6 space-y-3">
              <Typography variant="h6" className="text-lg font-semibold">{selectedItem.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedItem.description}
              </Typography>
              <Typography className="text-orange-600 font-bold">Rs. {selectedItem.price.toFixed(2)}</Typography>
              <button
                onClick={() => handleAddToCart(selectedItem)}
                className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Kids;
