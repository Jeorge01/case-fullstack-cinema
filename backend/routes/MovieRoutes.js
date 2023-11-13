const { Router } = require("express");
const MovieController = require("../controllers/MovieController");
const movieRouter = Router();

// Define routes regarding movies
movieRouter.get("/movies", MovieController.handleShowAll);

movieRouter.get("/movies/:id", MovieController.handleShowOneMovie);

module.exports = movieRouter;