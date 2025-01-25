import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listings: [],
};

const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        addListing(state, action) {
            state.listings.push(action.payload);
        },
        editListing(state, action) {
            const { index, updatedListing } = action.payload;
            state.listings[index] = updatedListing;
        },
        deleteListing(state, action) {
            state.listings = state.listings.filter((_, index) => index !== action.payload);
        },
        updateAvailability(state, action) {
            const { index, isAvailable } = action.payload;
            state.listings[index].isAvailable = isAvailable;
        },
    },
});

export const listingActions = listingSlice.actions;
export default listingSlice.reducer;
