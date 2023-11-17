const db = require('../db/db');

async function insert(amount, dateTime, status) {
    let query = `INSERT INTO payments (amount, dateTime, status) VALUES (${amount}, '${dateTime}', '${status}')`;
    let result = await db.sendQuery(query);
    return result;
}

module.exports = {
    insert,
}