const ShoppingCarts = require('../models/ShoppingCarts');

// GET /users/:id/shoppingCart
async function getAllByUserId(req, res) {
    const userId = req.params.id;
    const cart = await ShoppingCarts.readAllByUserId(userId);

    if (cart.length) {
        res.json(cart);
    } else {
        res.status(404).json({ error: "No shopping carts found." })
    }
}

// POST /users/:id/shoppingCart
async function add(req, res) {
    const { productCode, size, quantity } = req.body;
    const userId = req.params.id;

    if (!productCode || !size) {
        return res.status(400).json({ error: 'One or more required properties are missing.' });
    }

    const shoppingCart = await ShoppingCarts.insert(productCode, userId, size, quantity);

    if (shoppingCart) {
        let id = shoppingCart['insertId'];
        res.status(201).json({ message: 'Product added to cart successfully.' });
    } else {
        req.status(500).json({ error: 'Product addition failed.' });
    }
}

module.exports = {
    getAllByUserId,
    add,
}