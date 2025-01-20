import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token: '',
    email: '',
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isAuthenticated = true;
        },
        logout() {
            return initialAuthState;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;