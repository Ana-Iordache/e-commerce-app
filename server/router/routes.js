const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const products = require('../controllers/products')

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
router.get("/users/:email", (req, res) => requestHandler(users.getByEmail, req, res));
router.post("/users", (req, res) => requestHandler(users.addOne, req, res))

/**
 * PRODUCTS
 */
router.get("/categories", (req, res) => requestHandler(products.getCategoriesGrouped, req, res));
router.post("/products", (req, res) => requestHandler(products.addOne, req, res))


module.exports = router;