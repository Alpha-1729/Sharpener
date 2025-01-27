import { getDatabase, ref, get } from "firebase/database";
import { fetchAllBooking } from "../Booking/bookingActions";
import { fetchAllListings } from "../Listing/listingActions";

const database = getDatabase();

export const fetchBookingHistory = async () => {
    try {
        const { response: bookings, error: bookingError } = await fetchAllBooking();

        

        if (!bookings) {
            return { response: [], error: null };
        }

        const { response: listings, error: listingError } = await fetchAllListings();
        if (!listings) {
            return { response: [], error: listingError || "Failed to fetch listings." };
        }

        const filteredBooking = bookings.filter(listing => listing.status === 'pending');
        console.log(filteredBooking, "listings");


        // Combine bookings with listing details
        const orderHistory = filteredBooking.map((booking) => {
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
        return { response: orderHistory, error: null };
    } catch (err) {
        return { response: null, error: "Failed to fetch order history." };
    }
};
