const crypto = require("crypto");
const UserModel = require("../models/UserModel");

const userSessions = {};

function getUserFromSession(sessionKey) {
    return Object.keys(userSessions).find((username) => userSessions[username] === sessionKey);
}

function handleSignIn(req, res) {
    const { username, password } = req.body;

    const isAuthenticated = UserModel.authenticate(username, password);

    if (!isAuthenticated) {
        console.log("signin failed");
        return res.status(401).send("Not authenticated");
    }

    const sessionKey = crypto.randomBytes(20).toString("base64");
    userSessions[username] = sessionKey;

    res.send({ sessionKey });
}

function handleShowAllUsers(req, res) {
    const allUsersData = UserModel.showAllUsers();
    res.send(allUsersData);
}

function handleGetUserByUsername(req, res) {
    const sessionKey = req.query.sessionKey;

    if (!sessionKey || !Object.values(userSessions).includes(req.query.sessionKey)) {
        return res.status(401).send("Not authorized");
    }

    const { username } = req.params;

    const user = UserModel.getUserByUsername(username);

    if (!user) {
        return res.status(404).send("User not found!");
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
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

function handleUpdateUser(req, res) {
    const sessionKey = req.query.sessionKey;
    const usernameFromRoute = req.params.username;

    // Check if the session key is provided and valid
    if (sessionKey && Object.values(userSessions).includes(sessionKey)) {
        const loggedInUsername = getUserFromSession(sessionKey);

        // Get the user's information based on the username from the route
        const userToUpdate = UserModel.getUserByUsername(usernameFromRoute);

        // Ensure that the username from the route matches the logged-in user
        if (!userToUpdate || loggedInUsername !== userToUpdate.username) {
            console.log("Forbidden: Cannot update data for another user");
            return res.status(403).send("Forbidden: Cannot update data for another user");
        }

        console.log("Received request to update user data");
        console.log("Request body:", req.body);

        const updatedUserData = req.body;

        // Log the updatedUserData object before manipulation
        console.log("updatedUserData before manipulation:", updatedUserData);

        // Update user properties based on the provided JSON payload
        for (const prop in updatedUserData) {
            if (updatedUserData.hasOwnProperty(prop) && userToUpdate.hasOwnProperty(prop)) {
                userToUpdate[prop] = updatedUserData[prop];
            }
        }

        // Log the updatedUserData object after manipulation
        console.log("updatedUserData after manipulation:", updatedUserData);

        // Ensure that updateUser is a function in UserModel
        if (typeof UserModel.updateUser === "function") {
            // Log the state of the user object before it gets updated in the database
            console.log("User object before update:", userToUpdate);

            const updatedUser = UserModel.updateUser(userToUpdate);

            console.log("User data update successful");

            return res.status(200).json(updatedUser);
        } else {
            console.error("updateUser is not a function in UserModel");
            return res.status(500).send("Internal Server Error");
        }
    } else {
        // Handle the case for non-logged-in users or invalid session key
        console.log("Unauthorized: Invalid or missing session key");
        return res.status(401).send("Unauthorized: Invalid or missing session key");
    }
}

module.exports = {
    handleShowAllUsers,
    handleGetUserByUsername,
    handleSignIn,
    userSessions,
    getUserFromSession,
    handleCreateUser,
    handleUpdateUser,
};
