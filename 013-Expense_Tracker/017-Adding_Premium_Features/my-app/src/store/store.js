import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import expenseReducer from '../store/expenseSlice';
import themeReducer from '../store/themeSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        expense: expenseReducer,
        theme: themeReducer
    }
});


export default store;