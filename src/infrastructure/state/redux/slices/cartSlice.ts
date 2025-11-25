import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../../../../core/domain/cart/entities/CartItem';
import type { Product } from '../../../../core/domain/product/entities/Product';
import { mockCartItems } from '../../../data/mockData';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: mockCartItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(
        (item) => item.product.id === action.payload
      );
      
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
  },
});

// Selectors
export const selectCartItems = (state: { cart: CartState }): CartItem[] => 
  state.cart.items;

export const selectCartCount = (state: { cart: CartState }): number => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state: { cart: CartState }): number => 
  state.cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
