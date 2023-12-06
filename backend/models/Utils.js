const fs = require("fs");

function getDatabase() {
    try {
        const dbData = fs.readFileSync("./database/cinemaDB.json", { encoding: "utf-8" });
        return JSON.parse(dbData);
    } catch (error) {
        console.error("Error reading cinemaDB:", error);
        throw error; // Rethrow the error to propagate it up the call stack
    }
}

function setDatabase(data) {
    try {
        const str = JSON.stringify(data);
        fs.writeFileSync("./database/cinemaDB.json", str);
        console.log("Cinema database updated successfully.");
    } catch (error) {
        console.error("Error updating cinemaDB:", error);
        throw error;
    }
}

function getBookings() {
    try {
        const bookingsData = fs.readFileSync("./database/bookingDB.json", { encoding: "utf-8" });
        return JSON.parse(bookingsData);
    } catch (error) {
        console.error("Error reading bookingDB:", error);
        throw error;
    }
}

function setBookings(data) {
    try {
        const str = JSON.stringify(data);
        fs.writeFileSync("./database/bookingDB.json", str);
        console.log("Bookings updated successfully.");
    } catch (error) {
        console.error("Error updating bookingDB:", error);
        throw error;
    }
}

function getUsers() {
    try {
        const usersData = fs.readFileSync("./database/usersDB.json", { encoding: "utf-8" });
        return JSON.parse(usersData);
    } catch (error) {
        console.error("Error reading usersDB:", error);
        throw error;
    }
}

function setUsers(data) {
    try {
        const str = JSON.stringify(data);
        fs.writeFileSync("./database/usersDB.json", str);
        console.log("Users database updated successfully.");
    } catch (error) {
        console.error("Error updating usersDB:", error);
        throw error;
    }
}

module.exports = {
    getDatabase,
    setDatabase,
    getBookings,
    setBookings,
    getUsers,
    setUsers,
};
