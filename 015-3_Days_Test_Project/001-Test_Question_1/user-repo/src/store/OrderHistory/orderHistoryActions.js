import { getDatabase } from "firebase/database";
import { fetchBookingsByEmail } from "../Booking/bookingActions";
import { fetchAllListings } from "../Listing/listingActions";

const database = getDatabase();

export const fetchOrderHistory = async (email) => {
    try {
        const { response: bookings, error: bookingError } = await fetchBookingsByEmail(email);

        if (!bookings) {
            return { response: [], error: null };
        }

        const { response: listings, error: listingError } = await fetchAllListings();
        console.log(listings); // Debug log to inspect the listings
        if (!listings) {
            return { response: [], error: listingError || "Failed to fetch listings." };
        }

        // Combine bookings with listing details
        const orderHistory = bookings.map((booking) => {
            // Find the corresponding listing based on the listingId
            const listingDetails = listings.find(listing => listing.id === booking.listingId);

            return {
                ...booking,
                bookedPrice: +listingDetails.pricePerNight * booking.noOfGuests,
                lisitngDescription: listingDetails.description,
                imageUrl: listingDetails.imageUrls[0],
                placeName: listingDetails.placeName
            };
        });

        // Sort order history so that "pending" bookings are shown first
        orderHistory.sort((a, b) => {
            if (a.status === "pending" && b.status !== "pending") return -1;
            if (a.status !== "pending" && b.status === "pending") return 1;
            return 0;
        });

        return { response: orderHistory, error: null };
    } catch (err) {
        return { response: null, error: "Failed to fetch order history." };
    }
};
