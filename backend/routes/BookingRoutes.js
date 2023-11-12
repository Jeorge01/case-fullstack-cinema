const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/bookings", (req, res) => {
    const { email, movie, show, selectedSeats } = req.body;

    // Do validation checks if needed

    // Save booking information to bookingDB.json
    const bookingData = {
        email,
        movie,
        show,
        selectedSeats,
    };

    try {
        const bookingDBPath = './database/bookingDB.json';
        const bookings = JSON.parse(fs.readFileSync(bookingDBPath));
        bookings.push(bookingData);
        fs.writeFileSync(bookingDBPath, JSON.stringify(bookings, null, 2));

        res.status(201).json({ success: true, message: 'Booking successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
