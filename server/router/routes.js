const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const products = require('../controllers/products')
const favoriteProducts = require('../controllers/favoriteProducts')
const shoppingCarts = require('../controllers/shoppingCarts')
const addresses = require('../controllers/addresses')
const orders = require('../controllers/orders')
const stripePayments = require('../controllers/stripePayments')

async function requestHandler(callback, req, res) {
    if (!callback) {
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
router.put("/users/:id", (req, res) => requestHandler(users.updateById, req, res))


/**
 * ADDRESSES
 */
router.get("/users/:id/address", (req, res) => requestHandler(addresses.getByUserId, req, res));
router.post("/users/:id/address", (req, res) => requestHandler(addresses.addOne, req, res));
router.put("/addresses/:id", (req, res) => requestHandler(addresses.updateById, req, res));

/**
 * PRODUCTS
 */
router.get("/categories", (req, res) => requestHandler(products.getCategoriesGrouped, req, res));
router.get("/products", (req, res) => requestHandler(products.getAll, req, res));
router.post("/products", (req, res) => requestHandler(products.addOne, req, res))
router.put("/products/:id", (req, res) => requestHandler(products.updateById, req, res))

/**
 * FAVORITE PRODUCTS
 */
router.get("/users/:id/favorites", (req, res) => requestHandler(favoriteProducts.getAllByUserId, req, res))
router.post("/users/:id/favorites", (req, res) => requestHandler(favoriteProducts.add, req, res))
router.delete("/users/:id/favorites/:code", (req, res) => requestHandler(favoriteProducts.remove, req, res))

/**
 * SHOPPING CARTS
 */
router.get("/users/:id/shoppingCarts", (req, res) => requestHandler(shoppingCarts.getAllByUserId, req, res))
router.post("/users/:id/shoppingCarts", (req, res) => requestHandler(shoppingCarts.add, req, res))
router.delete("/users/:id/shoppingCarts/:code", (req, res) => requestHandler(shoppingCarts.remove, req, res))

/**
 * STRIPE
 */
router.get("/success", (req, res) => requestHandler(stripePayments.successPayment, req, res))
router.get("/cancel", (req, res) => requestHandler(stripePayments.cancel, req, res))
router.post("/create-checkout-session", (req, res) => requestHandler(stripePayments.createCheckoutSession, req, res))

/**
 * ORDERS
 */
router.get("/users/:id/orders", (req, res) => requestHandler(orders.getAllByUserId, req, res))

module.exports = router;