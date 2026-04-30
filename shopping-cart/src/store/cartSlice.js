import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // TODO 1: Add item to cart
      // If item exists, increment quantity. If new, add with quantity: 1
      // Update totalQuantity
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
    },
    removeItem: (state, action) => {
      // TODO 2: Remove item from cart by id (action.payload)
      // Update totalQuantity
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      // TODO 3: Update item quantity
      // action.payload has { id, quantity }
      // If quantity <= 0, remove item
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      // TODO 4: Reset cart to initial state
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;