const UserModel = require("../models/UserModel");

function handleShowAllUsers(req, res) {
    const allUsersData = UserModel.showAllUsers();
    res.send(allUsersData);
}

function handleGetUserByUsername(req, res) {
    const {username} = req.params;

    const user = UserModel.getUserByUsername(username);

    if (!user) {
        return res.status(404).send("User not found!")
    }
    res.send(user);
}

module.exports = {
    handleShowAllUsers,
    handleGetUserByUsername
}