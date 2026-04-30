import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// TODO 5: Create and export the store using configureStore
// The store should have a "cart" key that uses cartReducer

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
 
export default store;