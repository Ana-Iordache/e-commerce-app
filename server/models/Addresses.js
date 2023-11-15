const db = require('../db/db');

async function readByUserId(userId) {
    let query = `SELECT a.* FROM addresses a JOIN users u ON u.addressId = a.id WHERE u.id = ${userId}`;
    let result = await db.sendQuery(query);
    return result;
}

async function insert(city, street, number, zipCode, floor, apartmentNumber) {
    let query = `INSERT INTO addresses (city, street, number, zipCode, floor, apartmentNumber) VALUES ('${city}', '${street}', '${number}', ${zipCode}, ${floor}, ${apartmentNumber})`;
    let result = await db.sendQuery(query);
    return result;
}

async function updateById(id, city, street, number, zipCode, floor, apartmentNumber) {
    let query = `UPDATE addresses SET city = '${city}', street = '${street}', number = '${number}', zipCode = ${zipCode}, floor = ${floor}, apartmentNumber = ${apartmentNumber} WHERE id = ${id}`;
    let result = await db.sendQuery(query);
    return result;
}

module.exports = {
    readByUserId,
    insert,
    updateById,
}