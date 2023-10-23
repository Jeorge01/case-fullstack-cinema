const express = require("express");
const cors = require("cors");

const server = express();

// Make it possible to serve other apps on the same computer
server.use(cors());

const PORT = 3123;

server.get("/", (req, res) => {
    res.send({message: "Hello from backend"});
})

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));