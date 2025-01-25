import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: []
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
            const { id, name } = action.payload;
            const category = state.categories.find((cat) => cat.id === id);
            if (category) {
                category.name = name;
            }
        },
        deleteCategory(state, action) {
            state.categories = state.categories.filter((cat) => cat.id !== action.payload.id);
        }
    }
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
