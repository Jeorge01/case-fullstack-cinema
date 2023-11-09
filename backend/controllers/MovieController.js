const MovieModel = require("../models/MovieModel");

function handleShowAll(req, res) {

    res.send(MovieModel.showAll());
    
}


function handleShowOneMovie(req, res) {

    const { id } = req.params;

    res.send(MovieModel.showOneById(Number(id)));
}


module.exports = {
    // export functions here!
    handleShowAll,
    handleShowOneMovie
}