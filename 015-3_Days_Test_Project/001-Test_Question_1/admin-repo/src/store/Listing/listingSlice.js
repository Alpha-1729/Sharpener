import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listings: [], // Default listing objects
};

const listingSlice = createSlice({
    name: "listing",
    initialState,
    reducers: {
        setListings(state, action) {
            state.listings = action.payload;
        },
        addListing(state, action) {
            state.listings.push(action.payload);
        },
        editListing(state, action) {
            const { id, updatedData } = action.payload;
            const index = state.listings.findIndex((listing) => listing.id === id);
            if (index !== -1) {
                state.listings[index] = { ...state.listings[index], ...updatedData };
                console.log(state.listings[index]);
            }
        },
        deleteListing(state, action) {
            const id = action.payload;
            state.listings = state.listings.filter((listing) => listing.id !== id);
        },
        updateAvailability(state, action) {
            const { id, availability } = action.payload;
            const index = state.listings.findIndex((listing) => listing.id === id);
            if (index !== -1) {
                state.listings[index].isAvailable = availability;
            }
        },
    },
});

export const listingActions = listingSlice.actions;
export default listingSlice.reducer;