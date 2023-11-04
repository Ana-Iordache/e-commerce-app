const db = require('../db/db');

async function selectAll() {
    let query = "SELECT * FROM users";
    let result = await db.sendQuery(query);
    return result;
}

async function insert(name, surname, phoneNumber, email, password, isAdmin) {
    let query = `INSERT INTO users (name, surname, phoneNumber, email, password, isAdmin) VALUES ('${name}', '${surname}', '${phoneNumber}', '${email}', '${password}', ${isAdmin})`;
    let result = await db.sendQuery(query);
    return result;
}

module.exports = {
    selectAll,
    insert,
}