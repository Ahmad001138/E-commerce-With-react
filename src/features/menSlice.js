// store.js
import { combineReducers } from '@reduxjs/toolkit';
import menReducer from '../features/menSlice'; // your men state
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  men: menReducer,
  
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['men'], e
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
