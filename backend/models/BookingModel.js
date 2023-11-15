const { getBookings, setBookings } = require("./Utils");

function showAllBookings() {
    const allBookings = getBookings();
    return allBookings;
}

function createBookings(newBooking) {
    try {
        const allBookings = getBookings();
        
        // Check if 'newBooking.seats' is defined before using map
        const seats = newBooking.seats ? newBooking.seats.map(seat => seat.seatNumber) : [];

        console.log("newBooking:", newBooking);
        console.log("seats:", seats);

        const bookingToAdd = {
            username: newBooking.username,
            email: newBooking.email,
            title: newBooking.title || '', // Include title if available
            room: newBooking.room || '',   // Include room if available
            time: newBooking.time || '',   // Include time if available
            seats: seats,
            bookedAt: new Date(),
        };

        console.log("bookingToAdd:", bookingToAdd);

        allBookings.push(bookingToAdd);
        setBookings(allBookings);

        return {
            success: true,
            message: "Booking successful",
            data: bookingToAdd
        };
    } catch (error) {
        console.error("Error in createBookings:", error);
        throw error;
    }
}

module.exports = { showAllBookings, createBookings };
