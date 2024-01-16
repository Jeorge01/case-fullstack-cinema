const { getBookings, setBookings } = require("./Utils");
const path = require("path");
const fs = require("fs");
const { writeFile } = require("fs").promises;

function showAllBookings() {
    const allBookings = getBookings();
    return allBookings;
}

function fetchBookedSeats({ movieId, showTime }) {
    try {
        const allBookings = getBookings();

        const bookedSeats = allBookings
            .filter((booking) => booking.movieId === movieId && booking.showTime === showTime)
            .flatMap((booking) => booking.seats);

        return bookedSeats;
    } catch (error) {
        console.error("Error fetching booked seats:", error);
        throw error;
    }
}

async function createBookings(newBooking, req) {
    try {
        const allBookings = getBookings();
        const seats = newBooking.seats ? newBooking.seats.map((seatObj) => seatObj.seatNumber) : [];

        // Validate seat numbers
        const isValidSeatNumber = (seatNumber) => {
            // Implement your validation logic here
            // For example, check if seatNumber follows a specific format
            const seatNumberRegex = /^[A-Z]\d+$/;
            return seatNumberRegex.test(seatNumber);
        };

        // Validate each seat number in the booking
        const areSeatNumbersValid = seats.every((seatNumber) => isValidSeatNumber(seatNumber));

        if (!areSeatNumbersValid) {
            console.error("Error: Invalid seatNumberObj in the seats array.");
            // Optionally, reject the booking request or take appropriate action
            throw new Error("Invalid seatNumberObj in the seats array.");
        }

        console.log("Received booking request:", newBooking);
        console.log("Seats to be booked:", seats);

        const cinemaDBPath = path.join(__dirname, "../database/cinemaDB.json");

        if (!fs.existsSync(cinemaDBPath)) {
            console.error("Error: cinemaDB.json file not found");
            throw new Error("cinemaDB.json file not found");
        }

        const cinemaDB = loadCinemaDB(cinemaDBPath);

        const selectedShow = getSelectedShow(cinemaDB, newBooking);

        checkIfSeatsAlreadyBooked(selectedShow, seats);

        bookSeats(selectedShow, seats);

        console.log("cinemaDB after modification:", cinemaDB);

        // Uncomment the following line to update the cinemaDB file
        const writeResult = await writeCinemaDBFile(cinemaDB, cinemaDBPath);
        console.log("writeResult:", writeResult);

        const bookedSeats = seats.map((seatNumber) => ({ seatNumber, booked: true }));

        const bookingToAdd = {
            userID: newBooking.userID,
            name: newBooking.name,
            username: newBooking.username,
            email: newBooking.email,
            title: newBooking.title || "",
            room: newBooking.room || "",
            time: newBooking.time || "",
            seats: bookedSeats,
            bookedAt: new Date(),
            movieId: newBooking.movieId,
        };

        // Add the booking details to allBookings
        allBookings.push(bookingToAdd);
        setBookings(allBookings);

        // Log the bookedSeats array
        console.log("bookedSeats:", bookedSeats);

        console.log("Booking successful:", bookingToAdd);

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

function loadCinemaDB(cinemaDBPath) {
    try {
        const cinemaDB = JSON.parse(fs.readFileSync(cinemaDBPath, { encoding: "utf-8" }));
        console.log("cinemaDB before modification:", cinemaDB);
        return cinemaDB;
    } catch (error) {
        console.error("Error parsing cinemaDB file:", error);
        throw error;
    }
}

function getSelectedShow(cinemaDB, newBooking) {
    const movieIndex = cinemaDB.cinema.movies.findIndex((movie) =>
        movie.shows.some((s) => s.room === newBooking.room && s.time === newBooking.time)
    );

    if (movieIndex === -1) {
        console.error("Error: No matching show found.");
        throw new Error("No matching show found.");
    }

    const movieWithShow = cinemaDB.cinema.movies.find((movie) =>
        movie.shows.some((s) => s.room === newBooking.room && s.time === newBooking.time)
    );

    if (!movieWithShow) {
        console.error("Error: No matching show found.");
        throw new Error("No matching show found.");
    }

    const selectedShow = movieWithShow.shows.find((s) => s.room === newBooking.room && s.time === newBooking.time);

    if (!selectedShow || !selectedShow.seats) {
        console.error("Error: Selected show or seats are undefined.");
        throw new Error("Invalid show in cinemaDB file");
    }

    return selectedShow;
}

function checkIfSeatsAlreadyBooked(selectedShow, seats) {
    console.log("seats:", seats)
    console.log("Selected Show:", selectedShow);
    const alreadyBookedSeats = seats.filter((seatObj) => {
        const seatNumber = seatObj;

        if (!seatNumber) {
            console.error("Error: Invalid seatNumberObj in the seats array.");
            // Optionally, reject the booking request or take appropriate action
            return false;
        }

        const seat = selectedShow.seats.find((s) => s.seatNumber === seatNumber);

        if (!seat) {
            console.error(`Error: Seat ${seatNumber} not found in the selected show.`);
            // Optionally, handle this error case
            return false;
        }

        return seat.booked;
    });

    console.log("Already Booked Seats:", alreadyBookedSeats);

    if (alreadyBookedSeats.length > 0) {
        console.error(
            `Error: Seats ${alreadyBookedSeats.map((seat) => seat.seatNumber).join(", ")} are already booked.`
        );
        throw new Error(`Seats ${alreadyBookedSeats.map((seat) => seat.seatNumber).join(", ")} are already booked.`);
    }
}

function bookSeats(selectedShow, seats) {
    seats.forEach((seatNumber) => {
        // Find the seat in the selected show
        const seat = selectedShow.seats.find((seat) => seat.seatNumber === seatNumber);

        if (seat) {
            // Update the booked status of the seat
            seat.booked = true;
        } else {
            console.error(`Error: Seat ${seatNumber} not found in the selected show.`);
            // Optionally, handle this error case
        }
    });
}

async function writeCinemaDBFile(cinemaDB, cinemaDBPath) {
    try {
        console.log("writeCinemaDBFile function called");
        console.log("cinemaDBPath:", cinemaDBPath);
        console.log("cinemaDB before write:", cinemaDB);

        // Use fs.promises.writeFile directly
        await writeFile(cinemaDBPath, JSON.stringify(cinemaDB, null, 2));

        console.log("cinemaDB file updated successfully.");
        return "Write successful";
    } catch (writeError) {
        console.error("Error writing cinemaDB file:", writeError);
        throw writeError;
    }
}

function removeBookings() {
    // You can implement the logic for removing bookings here
}

module.exports = { showAllBookings, createBookings, removeBookings, fetchBookedSeats };
