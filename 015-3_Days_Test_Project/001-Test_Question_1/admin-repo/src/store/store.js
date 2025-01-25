import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import categoryReducer from './Category/categorySlice';
import listingReducer from './Listing/listingSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoryReducer,
        listing: listingReducer
    }
});

export default store;