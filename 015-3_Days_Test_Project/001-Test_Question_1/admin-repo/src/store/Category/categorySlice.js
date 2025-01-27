import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
        },
        addCategory(state, action) {
            state.categories.push(action.payload);
        },
        editCategory(state, action) {
            const { id, name, url } = action.payload;
            const index = state.categories.findIndex((cat) => cat.id === id);
            if (index !== -1) {
                state.categories[index] = { ...state.categories[index], name, url };
            }
        },
        deleteCategory(state, action) {
            state.categories = state.categories.filter((cat) => cat.id !== action.payload);
        },
    },
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
