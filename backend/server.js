const express = require("express");
const cors = require("cors");
const movieRoutes = require("./routes/MovieRoutes");

const server = express();
const PORT = 3123;

// in order to recieve json data in req.body
server.use(express.json());

// Make it possible to serve other apps on the same computer
server.use(cors());

server.use(movieRoutes);



server.get("/", (req, res) => {
    res.send({message: "Hello from backend"})
});

server.get("/home", (req, res) => {
    res.send("show all movies")
});

server.get("/booking", (req, res) => {
    res.send("booking movie")

});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));