

import React from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import { Womenlist } from '../items/Womensitem';

const Women = () => {
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
        <div className="px-4 sm:px-6 py-10 bg-white min-h-screen">
            {/* 🧢 Header */}
            <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-wide">Women’s Clothing Collection</h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    Explore our beautiful selection of women’s wear.
                </p>
            </div>

            {/* 👗 Product Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {Womenlist.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-sm overflow-hidden text-center group relative"
                    >
                        {/* 🖼 Image Container with Hover Zoom */}
                        <div className="relative overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-[380px] object-cover transform transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* 🛒 Hover Button Overlay */}
                             <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleAddToCart(item)}
                                            className="!absolute !bottom-30 !left-1/2 !-translate-x-1/2 
                                                   !opacity-0 group-hover:!opacity-100 
                                                   !transition-opacity !duration-300 
                                                   !border-white !text-white 
                                                   hover:!bg-orange-600 hover:!border-orange-600 hover:!text-white"
                                          >
                                            Add to Cart
                                          </Button>

                        </div>

                        {/* 📦 Info Below Image */}
                        <div className="p-3">
                            <h3 className="text-sm text-gray-700 font-medium truncate">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">Rs. {item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};
export default Women;


