const db = require('../db/db');

async function insert(size, quantity, productCode) {
    let query = `INSERT INTO stock (size, quantity, productCode) VALUES ('${size}', ${quantity}, ${productCode})`;
    let result = await db.sendQuery(query);
    return result;
}

module.exports = {
    insert,
}