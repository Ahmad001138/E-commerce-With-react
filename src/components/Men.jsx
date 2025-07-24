// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addToCart } from '../features/cartSlice';

// const Products = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('https://fakestoreapi.com/products')
//       .then(res => setProducts(res.data))
//       .catch(err => console.error('Error fetching:', err));
//   }, []);

//   const handleAddToCart = (item) => {
//     if (!isAuthenticated) {
//       alert('Please login to add items to cart');
//       navigate('/login');
//       return;
//     }
//     dispatch(addToCart(item));
//     alert(`${item.title} added to cart ✅`);
//   };

//   return (
//   <div className="px-4 sm:px-6 py-8 bg-gray-50 min-h-screen">
//     <div className="max-w-4xl mx-auto text-center mb-10">
//       <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover the Latest in Men's Fashion</h1>
//       <p className="text-gray-600 text-sm sm:text-base">
//         Explore our hand-picked collection of stylish and comfortable men's clothing. Whether you're looking for casual, formal, or trendy outfits – we've got you covered.
//       </p>
//     </div>

//     <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//       {products.map(item => (
//         <div key={item.id} className="bg-white rounded-lg shadow group overflow-hidden relative">
//           <div className="relative w-full h-48 bg-white flex items-center justify-center overflow-hidden">
//             <img
//               src={item.image}
//               alt={item.title}
//               className="max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
//             />
//             <Button
//               variant="contained"
//               size="small"
//               sx={{
//                 position: 'absolute',
//                 bottom: 8,
//                 opacity: 0,
//                 backgroundColor: '#C10007',
//                 color: '#fff',
//                 textTransform: 'uppercase',
//                 fontSize: '0.7rem',
//                 fontWeight: 'bold',
//                 borderRadius: '8px',
//                 transition: 'opacity 0.3s',
//                 '&:hover': { backgroundColor: '#a10005' },
//               }}
//               className="group-hover:opacity-100"
//               onClick={() => handleAddToCart(item)}
//             >
//               Add
//             </Button>
//           </div>
//           <div className="p-3 text-center border-t">
//             <h3 className="text-sm font-medium text-gray-800 truncate">{item.title}</h3>
//             <p className="text-gray-600 mt-1">Rs. {item.price.toFixed(2)}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// };

// export default Products;
// src/pages/Products.jsx

import React from 'react';
import  { useEffect } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import { Menlist } from '../items/Menitems';

const Men = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // ✅ Save current page to localStorage on mount
  useEffect(() => {
    localStorage.setItem('lastVisitedPage', '/men');
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

  return (
    <div className="px-4 sm:px-6 py-10 bg-white min-h-screen">
      {/* 🧢 Header */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide">Men’s Clothing Collection</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Explore our refined selection of stylish and comfortable men's wear.
        </p>
      </div>

      {/* 🧥 Product Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {Menlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md group overflow-hidden hover:shadow-lg transition-shadow duration-300"
            style={{ height: '340px' }}
          >
            {/* 📸 Image Container */}
            <div className="relative h-full">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
              />

              {/* 🏷️ Name & Price Overlay */}
              <div className="absolute bottom-0 w-full bg-white bg-opacity-60 text-black text-center py-2">
                <h3 className="text-sm font-semibold truncate px-2">{item.name}</h3>
                <p className="text-xs font-light">Rs {item.price}</p>
              </div>

              {/* 🛒 Add to Cart Button */}
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAddToCart(item)}
                className="!absolute !bottom-28 !left-1/2 !-translate-x-1/2 
                  !opacity-0 group-hover:!opacity-100 
                  !border-white !text-white 
                  hover:!bg-orange-600 hover:!border-orange-600 hover:!text-white"
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

export default Men;



