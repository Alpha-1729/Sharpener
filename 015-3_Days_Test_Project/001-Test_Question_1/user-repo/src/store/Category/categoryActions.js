import { getDatabase, ref, set, update, remove, get, push } from "firebase/database";

const database = getDatabase();

export const fetchAllCategories = async () => {
    try {
        const snapshot = await get(ref(database, "categories"));
        if (snapshot.exists()) {
            const categories = Object.entries(snapshot.val()).map(([id, category]) => ({
                id,
                name: category.name,
                url: category.url
            }));
            return { response: categories, error: null };
        }
        return { response: [], error: null };
    } catch (err) {
        return { response: null, error: "Failed to fetch categories." };
    }
};
