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

function createUser(userData) {
    try {
        const allUsers = getUsers();

        const usernameAleadyExists = allUsers.some(user => user.username === userData.username);

        if (usernameAleadyExists) {
            return {
                success: false,
                message: "Username is already in use. Please choose another username",
            };
        }

        const userToAdd = {
            name: userData.name,
            username: userData.username,
            email: userData.email,
            password: userData.password,            
        };

        allUsers.push(userToAdd);
        setUsers(allUsers);

        return {
            success: true,
            message: "creating account successful",
            data: userToAdd
        };
    } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
    }
}

function updateUser() {
    
}

// console.log(getUserByUsername("user2"));

module.exports = {
    showAllUsers,
    getUserByUsername,
    authenticate,
    createUser
}