const bookingModel = require("../models/BookingModel");
const { userSessions, getUserFromSession } = require("./UserController");
const UserModel = require("../models/UserModel");

function handleShowAllBookings(req, res) {
    res.send(bookingModel.showAllBookings());
}

function handleCreateBookings(req, res) {
    console.log("Received booking request:", req.body);
    const sessionKey = req.query.sessionKey;

    if (sessionKey && Object.values(userSessions).includes(sessionKey)) {
        // User is logged in
        const username = getUserFromSession(sessionKey);
        const user = UserModel.getUserByUsername(username);

        // Validate that the provided user data matches the logged-in user
        const mismatchedProps = ["userID", "name", "username", "email"].filter((prop) => req.body[prop] !== user[prop]);

        if (mismatchedProps.length > 0) {
            return res
                .status(403)
                .send(
                    `Forbidden: Booking data does not match the logged-in user. Invalid properties: ${mismatchedProps.join(
                        ", "
                    )}`
                );
        }

        const newBooking = {
            userID: user.userID,
            name: user.name,
            username: user.username,
            email: user.email,
            title: req.body.title || "",
            room: req.body.room || "",
            time: req.body.time || "",
            seats: Array.isArray(req.body.seats) ? req.body.seats.map((seat) => ({ seatNumber: seat })) : [],
            bookedAt: new Date().toISOString(),
        };

        console.log("New booking data:", newBooking);
        
        createAndSendBooking(res, newBooking);
    } else {
        // User is not logged in

        // Validate that only allowed properties are present
        const allowedProps = ["name", "email", "title", "room", "time", "seats", "bookedAt"];
        const invalidProps = Object.keys(req.body).filter((prop) => !allowedProps.includes(prop));

        if (sessionKey) {
            // Invalid session key
            return res.status(401).send("Not authorized: Invalid session key");
        }

        if (invalidProps.length > 0) {
            // Invalid properties for non-logged-in user
            return res.status(400).send(`Invalid properties for non-logged-in user: ${invalidProps.join(", ")}`);
        }

        const newBooking = {
            name: req.body.name,
            email: req.body.email,
            title: req.body.title,
            room: req.body.room,
            time: req.body.time,
            seats: Array.isArray(req.body.seats) ? req.body.seats.map((seat) => ({ seatNumber: seat })) : [],
            bookedAt: new Date().toISOString(),
        };

        createAndSendBooking(res, newBooking);
    }
}

function createAndSendBooking(res, newBooking) {
    // Ensure that createBookings is a function in bookingModel
    if (typeof bookingModel.createBookings === "function") {
        // Log the state of the booking object before it gets added to the database
        console.log("Booking object before addition:", newBooking);

        const createdBooking = bookingModel.createBookings(newBooking);

        console.log("Booking Successful");

        return res.status(201).json(createdBooking);
    } else {
        console.error("createBookings is not a function in bookingModel");
        return res.status(500).send("Internal Server Error");
    }
}

async function handleFetchBookedSeats(req, res) {
    const { movieId, showTime } = req.query;

    try {
        const bookedSeats = await bookingModel.fetchBookedSeats({ movieId, showTime });
        res.json(bookedSeats);
    } catch (error) {
        console.error("Error fetching booked seats:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    handleShowAllBookings,
    handleCreateBookings,
    handleFetchBookedSeats
};
