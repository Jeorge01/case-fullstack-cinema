const bookingModel = require("../models/BookingModel");
const { userSessions, getUserFromSession } = require("./UserController");
const UserModel = require("../models/UserModel");

function handleShowAllBookings(req, res) {
  res.send(bookingModel.showAllBookings());
}

function handleCreateBookings(req, res) {
  const sessionKey = req.query.sessionKey;

  // Check if the session key is provided and valid
  if (sessionKey && Object.values(userSessions).includes(sessionKey)) {
    const username = getUserFromSession(sessionKey);

    // Get the user's information based on the username
    const user = UserModel.getUserByUsername(username);

    console.log("Received request to create booking");
    console.log("Request body:", req.body);

    const newBooking = req.body;

    // Log the newBooking object before manipulation
    console.log("newBooking before manipulation:", newBooking);

    // Now you have the user's information, you can associate it with the booking
    newBooking.username = user.username;

    // Log the newBooking object after manipulation
    console.log("newBooking after manipulation:", newBooking);

    // Log the values of title, room, and time after manipulation
    console.log("newBooking.title:", newBooking.title);
    console.log("newBooking.room:", newBooking.room);
    console.log("newBooking.time:", newBooking.time);

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
  } else {
    // Handle the case for non-logged-in users
    const { username, email, title, room, time, seats, seatNumber } = req.body;

    // Check if the provided username and email are valid (customize this logic)
    if (!username || !email) {
      return res.status(400).send("Invalid username or email");
    }

    const newBooking = {
      username, // Associate with the provided username
      email,
      title,
      room,
      time,
      seatNumber,
      seats: Array.isArray(seats) ? seats.map(seat => ({ seatNumber: seat })) : [],
    };

    // Log the newBooking object before manipulation
    console.log("newBooking before manipulation:", newBooking);

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
}

module.exports = {
  handleShowAllBookings,
  handleCreateBookings,
};
