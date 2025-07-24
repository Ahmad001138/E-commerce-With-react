import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducers
import authReducer from '../features/authSlice';
import cartReducer from '../features/cartSlice';

// ✅ Config for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'], // 👈 only persist auth and cart slices
};

// ✅ Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

// ✅ Create persisted reducer  
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store with middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// ✅ Persistor for redux-persist
export const persistor = persistStore(store);
