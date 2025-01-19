import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './uiSlice';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            state.totalQuantity++;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name,
                });
            }
            else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
            state.changed = true;
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            state.totalQuantity--;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id); // Update state.items
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
            state.changed = true;
        }

    }
})




export const cartActions = cartSlice.actions;
export default cartSlice;