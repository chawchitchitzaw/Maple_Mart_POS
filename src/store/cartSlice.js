import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.barcode === newItem.barcode);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },
    removeItemFromCart(state, action) {
      const barcode = action.payload;
      const existingItem = state.items.find(item => item.barcode === barcode);

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
        
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.barcode !== barcode);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },

    chargeOut(state){
      return initialState;
    }
  },
});

export const { addItemToCart, removeItemFromCart,chargeOut } = cartSlice.actions;

export default cartSlice.reducer;
