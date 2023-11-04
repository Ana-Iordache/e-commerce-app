const mysql = require('mysql2')
const config = require('../../config.json')

const connectionPool = mysql.createPool({
    port: config.DB_PORT,
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    connectionLimit: config.DB_MAX_CONNECTION_LIMIT,

})

connectionPool.on('connection', conn => {
    console.log("DB connection established successfully (" + config.DB_HOST + ":" + config.DB_PORT + ")");
})


connectionPool.on('error', err => {
    console.log("DB connection failed (" + config.DB_HOST + ":" + config.DB_PORT + ")");
})

function sendQuery(query) {
    return new Promise((resolve, reject) => {
        connectionPool.query(query, (error, rows, fields) => {
            if (error) {
                reject(error);
            }
            resolve(rows);
        })
    })
}

function disconnect() {
    pool.end();
}

module.exports = {
    sendQuery,
    disconnect,
}