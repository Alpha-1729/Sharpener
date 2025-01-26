import { getDatabase, ref, set, update, remove, get, push } from "firebase/database";

const database = getDatabase();

export const fetchAllBooking = async () => {
    try {
        const snapshot = await get(ref(database, "bookings"));
        if (snapshot.exists()) {
            const allBookings = Object.entries(snapshot.val()).map(([id, booking]) => ({
                id,
                ...booking,
            }));

            return { response: allBookings, error: null };
        }
        return { response: [], error: null }; // No bookings found
    } catch (err) {
        return { response: null, error: "Failed to fetch bookings." };
    }
};

export const approveBooking = async (bookingId) => {
    try {
        // Reference to the specific booking in the database
        const bookingRef = ref(database, `bookings/${bookingId}`);

        // Update the status to "completed" (approved)
        await update(bookingRef, {
            status: "completed",
        });

        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: "Failed to approve booking." };
    }
};

export const rejectBooking = async (bookingId) => {
    try {
        // Reference to the specific booking in the database
        const bookingRef = ref(database, `bookings/${bookingId}`);

        // Update the status to "rejected"
        await update(bookingRef, {
            status: "rejected",
        });

        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: "Failed to reject booking." };
    }
};