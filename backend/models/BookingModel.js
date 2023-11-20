const { getBookings, setBookings } = require("./Utils");

function showAllBookings() {
    const allBookings = getBookings();
    return allBookings;
}

function createBookings(newBooking) {
    try {
        const allBookings = getBookings();

        // Check if 'newBooking.seats' is defined before using map
        const seats = newBooking.seats ? newBooking.seats.map((seat) => seat.seatNumber) : [];

        console.log("All bookings before modification:", allBookings);

        seats.forEach((seatNumber) => {
            const seatIndex = allBookings.findIndex((seat) => seat.seatNumber === seatNumber);
            if (seatIndex !== -1) {
                allBookings[seatIndex].booked = true;
            }
        });

        console.log("All bookings after modification:", allBookings);

        const bookingToAdd = {
            name:newBooking.name,
            username: newBooking.username,
            email: newBooking.email,
            title: newBooking.title || "", 
            room: newBooking.room || "", 
            time: newBooking.time || "", 
            seats: seats.map((seatNumber) => ({ seatNumber, booked: true })), // Ensure seats are marked as booked
            bookedAt: new Date(),
        };

        allBookings.push(bookingToAdd);
        setBookings(allBookings);

        return {
            success: true,
            message: "Booking successful",
            data: bookingToAdd,
        };
    } catch (error) {
        console.error("Error in createBookings:", error);
        throw error;
    }
}

function removeBookings() {}

module.exports = { showAllBookings, createBookings };
