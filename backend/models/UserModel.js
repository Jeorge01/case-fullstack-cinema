const {getUsers, setUsers} = require("./Utils");
const bookingModel = require("./BookingModel");

function authenticate(username, password) {

    const allUsers = getUsers(); 
    const user = allUsers.find(user => user.username === username)

    if (!user) {
        return false;
    }

    const isMatching = user.password === password;

    return isMatching;

}

console.log(authenticate("user1", "123sallad"));

function showAllUsers() {
    const allUsers = getUsers();

    allUsers.forEach(user => delete user.password);

    return allUsers;
}

function getUserByUsername(username) {
    const allUsers = getUsers();

    const user = allUsers.find(user => user.username === username);

    if (user) {
        delete user.password;
    }
    
    const allBookings = bookingModel.showAllBookings();
    const bookingsByUser = allBookings.filter(booking => booking.username === user.username)

    user.bookings = bookingsByUser;

    return user;
}

// console.log(getUserByUsername("user2"));

module.exports = {
    showAllUsers,
    getUserByUsername,
    authenticate
}