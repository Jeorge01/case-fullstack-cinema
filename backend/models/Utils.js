const fs = require("fs");

function getDatabase() {
    const dbData = fs.readFileSync("./database/cinemaDB.json", { encoding: "utf-8" });
    return JSON.parse(dbData);
}

function setDatabase(data) {
    const str = JSON.stringify(data);
    fs.writeFileSync("./database/cinemaDB.json", str);
}

function getBookings() {
    const bookingsData = fs.readFileSync("./database/bookingDB.json", { encoding: "utf-8" });
    return JSON.parse(bookingsData);
}

function setBookings(data) {
    const str = JSON.stringify(data);
    fs.writeFileSync("./database/bookingDB.json", str);
}

function getUsers() {
    const usersData = fs.readFileSync("./database/usersDB.json", { encoding: "utf-8" });
    return JSON.parse(usersData);
}

function setUsers(data) {
    const str = JSON.stringify(data);
    fs.writeFileSync("./database/usersDB.json", str);
}

module.exports = {
    getDatabase,
    setDatabase,
    getBookings,
    setBookings,
    getUsers,
    setUsers,
};
