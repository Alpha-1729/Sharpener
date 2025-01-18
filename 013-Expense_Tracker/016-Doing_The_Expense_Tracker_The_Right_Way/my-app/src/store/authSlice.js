import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
    token: null,
    email: null,
    isAuthenticated: false,
    emailVerified: false,
    isProfileComplete: true
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
        logout(state) {
            return initialAuthState;
        },
        updateProfileStatus(state, action) {
            state.isProfileComplete = action.payload;
        },
        updateEmailVerifiedStatus(state, action) {
            state.emailVerified = action.payload;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
