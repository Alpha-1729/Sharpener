import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || '',
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isAuthenticated = true;

            // Store values in localStorage
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('isAuthenticated', 'true');
        },
        logout(state) {
            // Reset state and remove from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('isAuthenticated');

            return initialAuthState;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
