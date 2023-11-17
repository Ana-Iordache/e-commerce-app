const db = require('../db/db');

async function insert(userId, orderDateTime, paymentId) {
    let query = `INSERT INTO orders (userId, orderDateTime, paymentId) VALUES (${userId}, '${orderDateTime}', ${paymentId})`;
    let result = await db.sendQuery(query);
    return result;
}

async function insertProductInOrders(orderId, productCode, size, quantity) {
    let query = `INSERT INTO products_in_orders (orderId, productCode, size, quantity) VALUES (${orderId}, ${productCode}, '${size}', ${quantity})`;
    let result = await db.sendQuery(query);
    return result;
}

module.exports = {
    insert,
    insertProductInOrders,
}