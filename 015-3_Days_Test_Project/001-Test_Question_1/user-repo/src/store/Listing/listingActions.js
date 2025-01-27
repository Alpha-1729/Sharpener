import { getDatabase, ref, get } from "firebase/database";

const database = getDatabase();

// Fetch all listings
export const fetchAllListings = async () => {
    try {
        const snapshot = await get(ref(database, "listings"));
        if (snapshot.exists()) {
            const listings = Object.entries(snapshot.val()).map(([id, listing]) => ({
                id, ...listing
            }));
            return { response: listings, error: null };
        }
        return { response: [], error: null };
    } catch (err) {
        return { response: null, error: "Failed to fetch listings." };
    }
};

// Fetch all listings and filter by price range (minPrice, maxPrice)
export const fetchListingsByCategory = async (category) => {
    try {
        // Fetch all listings
        const { response, error } = await fetchAllListings();

        if (response) {
            // Filter listings by price range
            const filteredListings = response.filter((listing) => listing.category === category && listing.isAvailable === true);

            return { response: filteredListings, error: null };
        }
        return { response: [], error: error || "No listings available." };
    } catch (err) {
        return { response: null, error: "Failed to fetch listings." };
    }
};
