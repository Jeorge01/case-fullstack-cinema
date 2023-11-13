const bookingModel = require("../models/BookingModel");

function handleShowAllBookings(req, res) {
    res.send(bookingModel.showAllBookings());
}

function handleCreateBookings(req, res) {
    const newBooking = req.body
    const createdBooking = bookingModel.createBookings(newBooking);
    res.send(createdBooking);
}

module.exports = {
    handleShowAllBookings,
    handleCreateBookings
}