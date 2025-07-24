import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';

const Kids = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [products, setProducts] = useState([]);

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

    return (
        <div className="px-4 sm:px-6 py-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover the Latest in Men's Fashion</h1>
                <p className="text-gray-600 text-sm sm:text-base">
                    Explore our hand-picked collection of stylish and comfortable men's clothing. Whether you're looking for casual, formal, or trendy outfits – we've got you covered.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow group overflow-hidden relative">
                        <div className="relative w-full h-48 bg-white flex items-center justify-center overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleAddToCart(item)}
                                className="!absolute !bottom-15 !left-1/2 !-translate-x-1/2 
                             !opacity-0 group-hover:!opacity-100 
                             !border-white !text-white 
                             hover:!bg-orange-600 hover:!border-orange-600 hover:!text-white"
                            >
                                Add to Cart
                            </Button>
                        </div>
                        <div className="p-3 text-center border-t">
                            <h3 className="text-sm font-medium text-gray-800 truncate">{item.title}</h3>
                            <p className="text-gray-600 mt-1">Rs. {item.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default Kids;
