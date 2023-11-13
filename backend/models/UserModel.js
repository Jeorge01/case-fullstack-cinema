const {getUsers, setUsers} = require("./Utils");

function showAllUsers() {
    const allUsers = getUsers();
    return allUsers;
}

function getUserByUsername(username) {
    const allUsers = getUsers();

    const user = allUsers.find(user => user.username === username);

    if (user) {
        delete user.password;
    }
    
    return user;
}

module.exports = {
    showAllUsers,
    getUserByUsername
}