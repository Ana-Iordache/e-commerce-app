const express = require('express');
const router = express.Router();
const users = require('../controllers/users')

async function requestHandler(callback, req, res) {
    if(!callback) {
        res.status(500).json({ error: "Router error. Please check controller callback function." });
        return;
    }

    try {
        await callback(req, res);
    } catch (error) {
        console.error("An error occured: ", error.message);
        res.status(500).json({ error: "An error occured: " + error.message });
    }
}

/**
 * USERS
 */
router.get("/users", (req, res) => requestHandler(users.getAll, req, res));
router.post("/users", (req, res) => requestHandler(users.addOne, req, res))

module.exports = router;