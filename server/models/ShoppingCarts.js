const db = require('../db/db');

async function readAllByUserId(userId) {
    let query = `SELECT * FROM shopping_carts WHERE userId = ${userId}`;
    let result = await db.sendQuery(query);
    return result;
}

async function readOneByUserIdAndProductCode(userId, productCode) {
    let query = `SELECT * FROM shopping_carts WHERE userId = ${userId} AND producstCode = ${productCode}`;
    let result = await db.sendQuery(query);
    return result[0];
}

async function insert(productCode, userId, size, quantity) {
    let query = `INSERT INTO shopping_carts (productCode, userId, size, quantity) VALUES (${productCode}, ${userId}, '${size}', ${quantity})`;
    let result = await db.sendQuery(query);
    return result;
}

async function updateQuantityByUserIdAndProductCode(userId, productCode, quantity) {
    let query = `UPDATE shopping_carts SET quantity = ${quantity} WHERE userId = ${userId} AND producstCode = ${productCode}`;
    let result = await db.sendQuery(query);
    return result;
}

module.exports = {
    readAllByUserId,
    readOneByUserIdAndProductCode,
    insert,
    updateQuantityByUserIdAndProductCode,
}