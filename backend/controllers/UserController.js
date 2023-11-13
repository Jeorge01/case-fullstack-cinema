const UserModel = require("../models/UserModel");

function handleShowAllUsers(req, res) {
    res.send(UserModel.showAllUsers);
}

function handleGetUserByUsername(req, res) {
    res.send(UserModel.getUserByUsername);
}

module.exports = {
    handleShowAllUsers,
    handleGetUserByUsername
}