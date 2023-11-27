const { getBookings, setBookings } = require("./Utils");
const path = require("path");
const fs = require("fs");

function showAllBookings() {
    const allBookings = getBookings();
    return allBookings;
}

function fetchBookedSeats({ movieId, showTime }) {
    try {
        const allBookings = getBookings();

        const bookedSeats = allBookings
            .filter(booking => booking.movieId === movieId && booking.showTime === showTime)
            .flatMap(booking => booking.seats);

        return bookedSeats;
    } catch (error) {
        console.error("Error fetching booked seats:", error);
        throw error;
    }
}

function createBookings(newBooking) {
    try {
        const allBookings = getBookings();
        const seats = newBooking.seats ? newBooking.seats.map((seat) => seat.seatNumber) : [];

        console.log("Received booking request:", newBooking);
        console.log("Seats to be booked:", seats);

        const cinemaDBPath = path.join(__dirname, "../database/cinemaDB.json");

        if (!fs.existsSync(cinemaDBPath)) {
            console.error("Error: cinemaDB.json file not found");
            throw new Error("cinemaDB.json file not found");
        }

        try {
            const cinemaDB = JSON.parse(fs.readFileSync(cinemaDBPath, { encoding: "utf-8" }));

            console.log("cinemaDB before modification:", cinemaDB);

            if (!cinemaDB || !cinemaDB.cinema || !cinemaDB.cinema.movies) {
                console.error("Error: cinemaDB.cinema.movies is undefined");
                throw new Error("Invalid cinemaDB file");
            }

            const movieWithShow = cinemaDB.cinema.movies.find((movie) =>
                movie.shows.some((s) => s.room === newBooking.room && s.time === newBooking.time)
            );

            if (!movieWithShow) {
                console.error("Error: No matching show found.");
                throw new Error("No matching show found.");
            }

            const selectedShow = movieWithShow.shows.find(
                (s) => s.room === newBooking.room && s.time === newBooking.time
            );

            if (!selectedShow || !selectedShow.seats) {
                console.error("Error: Selected show or seats are undefined.");
                throw new Error("Invalid show in cinemaDB file");
            }

            seats.forEach((seatNumberObj) => {
                const seatNumber = seatNumberObj.seatNumber;
                const seatIndex = selectedShow.seats.findIndex((seat) => seat.seatNumber === seatNumber);

                if (seatIndex !== -1) {
                    selectedShow.seats[seatIndex].booked = true;
                } else {
                    console.error(`Error: Seat ${seatNumber} not found in the selected show.`);
                }
            });

            console.log("cinemaDB after modification:", cinemaDB);

            fs.writeFileSync(cinemaDBPath, JSON.stringify(cinemaDB, null, 2));

            const bookedSeats = seats.map((seatNumber) => ({ seatNumber, booked: true }));

            // Include movieId and showTime in the bookingToAdd object
            const bookingToAdd = {
                name: newBooking.name,
                username: newBooking.username,
                email: newBooking.email,
                title: newBooking.title || "",
                room: newBooking.room || "",
                time: newBooking.time || "",
                seats: bookedSeats,
                bookedAt: new Date(),
                // Include movieId and showTime in the booking
                movieId: newBooking.movieId,
                showTime: newBooking.showTime,
            };

            console.log("All bookings before modification:", allBookings);

            allBookings.push(bookingToAdd);
            setBookings(allBookings);

            console.log("All bookings after modification:", allBookings);

            console.log("Booking successful:", bookingToAdd);

            return {
                success: true,
                message: "Booking successful",
                data: bookingToAdd,
            };
        } catch (error) {
            console.error("Error parsing cinemaDB file:", error);
            throw error;
        }
    } catch (error) {
        console.error("Error in createBookings:", error);
        throw error;
    }
}

function removeBookings() {
    // You can implement the logic for removing bookings here
}

module.exports = { showAllBookings, createBookings, removeBookings, fetchBookedSeats };
