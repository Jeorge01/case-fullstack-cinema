const { getUsers, setUsers } = require("./Utils");
const bookingModel = require("./BookingModel");

function authenticate(username, password) {
    const allUsers = getUsers();
    const user = allUsers.find((user) => user.username === username);

    if (!user) {
        return false;
    }

    const isMatching = user.password === password;

    return isMatching;
}

console.log(authenticate("user1", "123sallad"));

function showAllUsers() {
    const allUsers = getUsers();

    allUsers.forEach((user) => delete user.password);

    return allUsers;
}

function getUserByUsername(username) {
    const allUsers = getUsers();

    const user = allUsers.find((user) => user.username === username);

    if (user) {
        delete user.password;
    }

    const allBookings = bookingModel.showAllBookings();
    const bookingsByUser = allBookings.filter((booking) => booking.username === user.username);

    user.bookings = bookingsByUser;

    return user;
}

function createUser(userData) {
    function generateUserID() {
        const timestamp = new Date().getTime().toString(16); // Convert timestamp to hexadecimal
        const randomPart = Math.floor(Math.random() * 1000000).toString(16); // Generate a random hexadecimal number

        return `${timestamp}-${randomPart}`;
    }

    try {
        const allUsers = getUsers();

        const usernameAleadyExists = allUsers.some((user) => user.username === userData.username);

        if (usernameAleadyExists) {
            return {
                success: false,
                message: "Username is already in use. Please choose another username",
            };
        }

        const userToAdd = {
            userID: generateUserID(),
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
            data: userToAdd,
        };
    } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
    }
}

function updateUser(userData) {
    try {
        const allUsers = getUsers();

        const usernameAleadyExists = allUsers.some((user) => user.username === userData.username);

        if (usernameAleadyExists) {
            return {
                success: false,
                message: "Username is already in use. Please choose another username",
            };
        }

        const userIdToUpdate = userData.userID;

        const userToUpdate = allUsers.find((user) => user.userID === userIdToUpdate);

        if (!userToUpdate) {
            return {
                success: false,
                message: "User not found",
            };
        }

        // Update user data
        userToUpdate.name = userData.name !== undefined ? userData.name : userToUpdate.name;
        userToUpdate.username = userData.username !== undefined ? userData.username : userToUpdate.username;
        userToUpdate.email = userData.email !== undefined ? userData.email : userToUpdate.email;
        userToUpdate.password = userData.password !== undefined ? userData.password : userToUpdate.password;

        setUsers(allUsers);

        return {
            success: true,
            message: "User data updated successfully",
            data: userToUpdate,
        };
    } catch (error) {
        console.error("Error in updateUser:", error);
        throw error;
    }
}

module.exports = {
    showAllUsers,
    getUserByUsername,
    authenticate,
    createUser,
    updateUser,
};
