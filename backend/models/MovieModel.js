const { getDatabase, setDatabase } = require("./Utils");

// const movieDatabase = [
//     {id: 1, title: "kalle", content: "kalle is a legend", author: "kalles lerjeunge"},
//     {id: 2, title: "kalle2", content: "kalle2 is a legend", author: "kalles lerjeunge2"},
//     {id: 3, title: "kalle3", content: "kalle3 is a legend", author: "kalles lerjeunge3"}
// ]

const allMovies = getDatabase();

function showAll() {
    return allMovies;
}

function showOneById(id) {
    return allMovies.cinema.movies.find((movie) => movie.id === id);
}

module.exports = {
    showAll,
    showOneById,
};
