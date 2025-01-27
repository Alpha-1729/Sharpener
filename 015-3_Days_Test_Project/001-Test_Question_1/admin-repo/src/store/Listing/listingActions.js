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
                imageUrls: listing.imageUrls
            }));
            return { response: listings, error: null };
        }
        return { response: [], error: null };
    } catch (err) {
        return { response: null, error: "Failed to fetch listings." };
    }
};

export const addListing = async (listing) => {
    try {
        const newListingRef = push(ref(database, "listings"));
        await set(newListingRef, {
            category: listing.category,
            fromDate: listing.fromDate,
            toDate: listing.toDate,
            placeName: listing.placeName,
            pricePerNight: listing.pricePerNight,
            address: listing.address,
            city: listing.city,
            pincode: listing.pincode,
            description: listing.description,
            isAvailable: listing.isAvailable,
            imageUrls: listing.imageUrls
        });
        return { response: { id: newListingRef.key, ...listing }, error: null };
    } catch (err) {
        return { response: null, error: "Failed to add listing." };
    }
};

export const editListing = async (listing) => {
    try {
        await update(ref(database, `listings/${listing.id}`), {
            category: listing.category,
            fromDate: listing.fromDate,
            toDate: listing.toDate,
            placeName: listing.placeName,
            pricePerNight: listing.pricePerNight,
            address: listing.address,
            city: listing.city,
            pincode: listing.pincode,
            description: listing.description,
            isAvailable: listing.isAvailable,
            imageUrls: listing.imageUrls
        });
        return { response: listing, error: null };
    } catch (err) {
        return { response: null, error: "Failed to update listing." };
    }
};

export const deleteListing = async (listingId) => {
    try {
        await remove(ref(database, `listings/${listingId}`));
        return { response: "Listing deleted successfully!", error: null };
    } catch (err) {
        return { response: null, error: "Failed to delete listing." };
    }
};
