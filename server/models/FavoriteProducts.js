const db = require('../db/db');

async function readAllByUserId(userId) {
    let query = `SELECT * FROM vw_favorites_products WHERE userId = ${userId}`;
    let result = await db.sendQuery(query);
    return result;
}

async function insert(productCode, userId) {
    let query = `INSERT INTO favorite_products (productCode, userId) VALUES (${productCode}, ${userId})`;
    let result = await db.sendQuery(query);
    return result;
}

async function remove(productCode, userId) {
    let query = `DELETE FROM favorite_products WHERE userId = ${userId} AND productCode = ${productCode}`;
    let result = await db.sendQuery(query);
    return result;
}

module.exports = {
    readAllByUserId,
    insert,
    remove,
}