import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import expenseReducer from '../store/expenseSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        expense: expenseReducer
    }
});


export default store;