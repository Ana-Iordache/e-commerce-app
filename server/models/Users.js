const db = require('../db/db');

async function selectAll() {
    let query = "SELECT * FROM users";
    let result = await db.sendQuery(query);
    return result;
}

async function selectByEmail(email) {
    let query = `SELECT id, name, surname, phoneNumber, isAdmin, addressId, email FROM users WHERE email = '${email}'`;
    let result = await db.sendQuery(query);
    return result;
}

async function insert(name, surname, phoneNumber, email, password, isAdmin) {
    let query = `INSERT INTO users (name, surname, phoneNumber, email, password, isAdmin) VALUES ('${name}', '${surname}', '${phoneNumber}', '${email}', '${password}', ${isAdmin})`;
    let result = await db.sendQuery(query);
    return result;
}

async function updateAddressForUser(userId, addressId) {
    let query = `UPDATE users set addressId = ${addressId} WHERE id = ${userId}`;
    let result = await db.sendQuery(query);
    return result;
}

async function updateById(id, name, surname, phoneNumber, email, password) {
    let query;
    if (password)
        query = `UPDATE users SET name = '${name}', surname = '${surname}', phoneNumber = '${phoneNumber}', email = '${email}', password = '${password}' WHERE id = ${id}`;
    else
        query = `UPDATE users SET name = '${name}', surname = '${surname}', phoneNumber = '${phoneNumber}', email = '${email}' WHERE id = ${id}`;
    let result = await db.sendQuery(query);
    return result;
}

module.exports = {
    selectAll,
    selectByEmail,
    insert,
    updateById,
    updateAddressForUser,
}