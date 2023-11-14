const ShoppingCarts = require('../models/ShoppingCarts');

// GET /users/:id/shoppingCart
async function getAllByUserId(req, res) {
    const userId = req.params.id;
    const cart = await ShoppingCarts.readAllByUserId(userId);

    if (cart.length) {
        cart.forEach(c => {
            let stockResponse = {};
            let stock = c.stock.split(",");
            stock.forEach(s => {
                let size = s.split(":")[0];
                let quantity = s.split(":")[1];
                stockResponse[size] = quantity;
            })

            c.stock = stockResponse;
        })
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

    // TODO
    // const productFromCart = await ShoppingCarts.readOneByUserIdAndProductCode(userId, productCode);
    // if(productFromCart) {
    //     const updated = await ShoppingCarts.updateQuantityByUserIdAndProductCode(userId, productCode, quantity);
    //     console.log("update: ", updated)
    //     if(updated) {
    //        return res.status(200).json({ message: 'Product quantity updated successfully.' });
    //     }
    // }
    const shoppingCart = await ShoppingCarts.insert(productCode, userId, size, quantity);

    if (shoppingCart) {
        let id = shoppingCart['insertId'];
        res.status(201).json({ message: 'Product added to cart successfully.' });
    } else {
        req.status(500).json({ error: 'Product addition failed.' });
    }
}

// DELETE /users/:id/shoppingCart/:code
async function remove(req, res) {
    const userId = req.params.id;
    const productCode = req.params.code;

    const product = await ShoppingCarts.remove(userId, productCode);
    if (product['affectedRows'] > 0) {
        res.status(200).json({ message: 'Product removed from cart successfully.' });
    } else {
        res.status(500).json({ error: 'Product removing failed.' });
    }
}

module.exports = {
    getAllByUserId,
    add,
    remove,
}