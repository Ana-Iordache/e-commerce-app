const db = require('../db/db');

async function insert(size, quantity, productCode) {
    let query = `INSERT INTO stock (size, quantity, productCode) VALUES ('${size}', ${quantity}, ${productCode})`;
    let result = await db.sendQuery(query);
    return result;
}

async function getByProductCode(productCode) {
    let query = `SELECT id, size, quantity FROM stock WHERE productCode = ${productCode}`;
    let result = await db.sendQuery(query);
    return result;
}

async function updateById(id, size, quantity) {
    let query = `UPDATE stock SET size = '${size}', quantity = ${quantity} WHERE id = ${id}`;
    let result = await db.sendQuery(query);
    return result;
}
module.exports = {
    insert,
    getByProductCode,
    updateById,
}