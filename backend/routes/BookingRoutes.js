const { Router } = require("express");
const BookingController = require("../controllers/BookingController");
const BookingRouter = Router();

BookingRouter.get("/showallbooking", BookingController.handleShowAllBookings);

BookingRouter.post("/book", BookingController.handleCreateBookings);

module.exports = BookingRouter;
