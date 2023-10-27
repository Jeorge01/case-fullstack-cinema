// TODO: add functions that manipultates data regarding movies

const movieDatabase = [
    {title: "kalle", content: "kalle is a legend", author: "kalles lerjeunge"},
    {title: "kalle2", content: "kalle2 is a legend", author: "kalles lerjeunge2"},
    {title: "kalle3", content: "kalle3 is a legend", author: "kalles lerjeunge3"}
]

function showAll() {
    return movieDatabase;
}

module.exports = {
    // add functions here to export!
    showAll
}

console.log(showAll());