const { Router } = require("express");
const UserController = require("../controllers/UserController");
const UserRouter = Router();

UserRouter.get("/users", UserController.handleShowAllUsers);

UserRouter.get("/users/:username", UserController.handleGetUserByUsername);

module.exports = UserRouter;
