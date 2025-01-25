import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token: localStorage.getItem('adminToken') || '',
    email: localStorage.getItem('adminEmail') || '',
    isAuthenticated: localStorage.getItem('adminIsAuthenticated') === 'true' || false,
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isAuthenticated = true;

            localStorage.setItem('adminToken', action.payload.token);
            localStorage.setItem('adminEmail', action.payload.email);
            localStorage.setItem('adminIsAuthenticated', 'true');
        },
        logout(state) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminEmail');
            localStorage.removeItem('adminIsAuthenticated');
            return initialAuthState;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
