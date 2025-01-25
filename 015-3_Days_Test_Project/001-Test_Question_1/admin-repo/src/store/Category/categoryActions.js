import { getDatabase, ref, set, update, remove, get, push } from "firebase/database";

const database = getDatabase();

export const fetchAllCategories = async () => {
    try {
        const snapshot = await get(ref(database, "categories"));
        if (snapshot.exists()) {
            const categories = Object.entries(snapshot.val()).map(([id, category]) => ({
                id,
                name: category.name,
            }));
            return { response: categories, error: null };
        }
        return { response: [], error: null };
    } catch (err) {
        return { response: null, error: "Failed to fetch categories." };
    }
};

export const addCategory = async (category) => {
    try {
        const newCategoryRef = push(ref(database, "categories"));
        await set(newCategoryRef, { name: category });
        return { response: { id: newCategoryRef.key, name: category }, error: null };
    } catch (err) {
        return { response: null, error: "Failed to add category." };
    }
};

export const editCategory = async (category) => {
    try {
        await update(ref(database, `categories/${category.id}`), { name: category.name });
        return { response: category, error: null };
    } catch (err) {
        return { response: null, error: "Failed to update category." };
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        await remove(ref(database, `categories/${categoryId}`));
        return { response: "Category deleted successfully!", error: null };
    } catch (err) {
        return { response: null, error: "Failed to delete category." };
    }
};
