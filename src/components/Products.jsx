// src/pages/Products.jsx
import React from 'react';
import { Menulist } from '../items/Items';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    dispatch(addToCart(item));
    alert(`${item.name} added to cart ✅`);
  };

  return (
    <div className="px-6 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Menulist.map((item) => (
          <div key={item.id} className="bg-white rounded-md shadow-md overflow-hidden flex flex-col">
            <img src={item.image} alt={item.name} className="w-full h-100 object-cover" />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-md font-semibold mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Rs. {item.price}</p>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#C10007',
                  color: '#fff',
                  mt: 'auto',
                }}
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
