const {getBookings, setBookings} = require("./Utils");



function showAllBookings() {
    const allBookings = getBookings();
    return allBookings;
}

function createBookings(newBooking) {
    const allBookings = getBookings();
    const bookingToAdd = {
        username: newBooking.username,
        email: newBooking.email,
        title: newBooking.title,
        room: newBooking.room,
        time: newBooking.time,
        seats: newBooking.seats

    }

    allBookings.push(bookingToAdd);
    console.log(bookingToAdd);

    setBookings(allBookings); 

    return (bookingToAdd)
}

module.exports = {showAllBookings, createBookings}


