const crypto = require("crypto");
const UserModel = require("../models/UserModel");

const userSessions = {};

function handleSignIn( req, res) {
    const {username, password} = req.body;

    const isAuthenticated = UserModel.authenticate(username, password);

    if (!isAuthenticated) {
        console.log("signin failed")
        return res.status(401).send("Not authenticated");
    }

    const sessionKey = crypto.randomBytes(20).toString("base64");
    userSessions[username] = sessionKey;

    res.send({sessionKey});
}


function handleShowAllUsers(req, res) {
    const allUsersData = UserModel.showAllUsers();
    res.send(allUsersData);
}

function handleGetUserByUsername(req, res) {
    const sessionKey = req.query.sessionKey;

    if (! sessionKey || !Object.values(userSessions).includes(req.query.sessionKey)) {
        return res.status(401).send("Not authorized");
    }

    const {username} = req.params;

    const user = UserModel.getUserByUsername(username);

    if (!user) {
        return res.status(404).send("User not found!")
    }
    res.send(user);
}

function handleCreateUser(req, res) {
    try {
        const userData = req.body;

        const result = UserModel.createUser(userData);

        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error("Error in handleCreateUser:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

module.exports = {
    handleShowAllUsers,
    handleGetUserByUsername,
    handleSignIn,
    userSessions,
    handleCreateUser
}