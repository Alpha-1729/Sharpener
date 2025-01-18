import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        cartIsVisible: false,
        notification: null, // Added notification state
    },
    reducers: {
        toggle: (state) => {
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification: (state, action) => {
            state.notification = {
                status: action.payload.status, // e.g., 'loading', 'success', 'error'
                title: action.payload.title,   // e.g., 'Success', 'Error'
                message: action.payload.message, // e.g., 'Data sent successfully!'
            };
        },
        clearNotification: (state) => {
            state.notification = null; // Clear the notification
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
