const FavoriteProducts = require('../models/FavoriteProducts');

// GET /users/:id/favorites
async function getAllByUserId(req, res) {
    const userId = req.params.id;
    const favorites = await FavoriteProducts.readAllByUserId(userId);

    if (favorites.length) {
        res.json(favorites);
    } else {
        res.status(404).json({ error: "No favorites found." })
    }
}

// POST /users/:id/favorites
async function add(req, res) {
    const { productCode } = req.body;
    const userId = req.params.id;

    if (!productCode) {
        return res.status(400).json({ error: 'One or more required properties are missing.' });
    }

    const favoriteProduct = await FavoriteProducts.insert(productCode, userId);

    if (favoriteProduct) {
        let id = favoriteProduct['insertId'];
        res.status(201).json({ message: 'Product added to favorites successfully.' });
    } else {
        req.status(500).json({ error: 'Product addition failed.' });
    }
}

module.exports = {
    getAllByUserId,
    add,
}