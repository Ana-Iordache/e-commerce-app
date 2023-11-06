const db = require('../db/db');

async function insert(url, productCode) {
    let query = `INSERT INTO images (url, productCode) VALUES ('${url}', ${productCode})`;
    let result = await db.sendQuery(query);
    return result;
}

async function getByProductCode(productCode) {
    let query = `SELECT url FROM images WHERE productCode = ${productCode}`;
    let result = await db.sendQuery(query);
    return result;
}


module.exports = {
    insert,
    getByProductCode
}