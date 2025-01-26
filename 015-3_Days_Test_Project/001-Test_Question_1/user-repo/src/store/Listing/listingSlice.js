import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listings: [
    ],
};

const listingSlice = createSlice({
    name: "listing",
    initialState,
    reducers: {
        setListings(state, action) {
            state.listings = action.payload;
        }
    },
});

export const listingActions = listingSlice.actions;
export default listingSlice.reducer;