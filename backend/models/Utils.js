const fs = require("fs");

function getDatabase() {
    const dbData = fs.readFileSync("./database/cinemaDB.json", {encoding: "utf-8"});
    return JSON.parse(dbData);
}

function setDatabase(data) {
    const str = JSON.stringify(data);
    fs.writeFileSync('./database/cinemaDB.json', str);
}

module.exports = {
    getDatabase,
    setDatabase
}