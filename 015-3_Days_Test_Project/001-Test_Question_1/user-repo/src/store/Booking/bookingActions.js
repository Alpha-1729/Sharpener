import { getDatabase, ref, set, update, remove, get, push } from "firebase/database";

const database = getDatabase();

export const addBookings = async (booking) => {
    try {
        const newBookingRef = push(ref(database, "bookings"));
        await set(newBookingRef, booking);
        return { response: { id: newBookingRef.key, ...booking }, error: null };
    } catch (err) {
        return { response: null, error: "Failed to add bookings." };
    }
};


export const fetchBookingsByEmail = async (email) => {
    try {
        const snapshot = await get(ref(database, "bookings"));
        if (snapshot.exists()) {
            const allBookings = Object.entries(snapshot.val()).map(([id, booking]) => ({
                id,
                ...booking,
            }));

            // Filter bookings by email
            const filteredBookings = allBookings.filter(
                (booking) => booking.email === email
            );

            return { response: filteredBookings, error: null };
        }
        return { response: [], error: null }; // No bookings found
    } catch (err) {
        return { response: null, error: "Failed to fetch bookings." };
    }
};

export const deleteBooking = async (bookingId) => {
    try {
        await remove(ref(database, `bookings/${bookingId}`));
        return { response: "Category deleted successfully!", error: null };
    } catch (err) {
        return { response: null, error: "Failed to delete category." };
    }
};