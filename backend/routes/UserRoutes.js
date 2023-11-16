const { Router } = require("express");
const UserController = require("../controllers/UserController");
const UserRouter = Router();

UserRouter.get("/signin", UserController.handleSignIn);

UserRouter.get("/users", UserController.handleShowAllUsers);

UserRouter.get("/users/:username", UserController.handleGetUserByUsername);

UserRouter.post("/createUser", UserController.handleCreateUser);

UserRouter.put("/changeUserData/:username", UserController.handleUpdateUser);

module.exports = UserRouter;
