const bookingModel = require("../models/BookingModel");
const {userSessions} = require("./UserController");

function handleShowAllBookings(req, res) {
    res.send(bookingModel.showAllBookings());
}

function handleCreateBookings(req, res) {
    if (! sessionKey || !Object.values(userSessions).includes(req.query.sessionKey)) {
        return res.status(401).send("Not authorized");
    }

    const newBooking = req.body
    const createdBooking = bookingModel.createBookings(newBooking);
    res.send(createdBooking);
}

module.exports = {
    handleShowAllBookings,
    handleCreateBookings
}