import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token: localStorage.getItem('userToken') || '',
    email: localStorage.getItem('userEmail') || '',
    isAuthenticated: localStorage.getItem('userIsAuthenticated') === 'true' || false,
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isAuthenticated = true;

            localStorage.setItem('userToken', action.payload.token);
            localStorage.setItem('userEmail', action.payload.email);
            localStorage.setItem('userIsAuthenticated', 'true');
        },
        logout(state) {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userIsAuthenticated');
            return initialAuthState;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
