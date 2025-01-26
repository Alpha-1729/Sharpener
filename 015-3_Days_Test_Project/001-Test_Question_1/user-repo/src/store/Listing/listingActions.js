import { getDatabase, ref, set, update, remove, get, push } from "firebase/database";

const database = getDatabase();

export const fetchAllListings = async () => {
    try {
        const snapshot = await get(ref(database, "listings"));
        if (snapshot.exists()) {
            const listings = Object.entries(snapshot.val()).map(([id, listing]) => ({
                id,
                category: listing.category,
                placeName: listing.placeName,
                pricePerNight: listing.pricePerNight,
                address: listing.address,
                city: listing.city,
                pincode: listing.pincode,
                fromDate: listing.fromDate,
                toDate: listing.toDate,
                description: listing.description,
                isAvailable: listing.isAvailable,
                imageUrl: listing.imageUrl
            }));
            return { response: listings, error: null };
        }
        return { response: [], error: null };
    } catch (err) {
        return { response: null, error: "Failed to fetch listings." };
    }
};
