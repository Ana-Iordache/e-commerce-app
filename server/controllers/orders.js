const Orders = require('../models/Orders');

// GET /users/:id/orders
async function getAllByUserId(req, res) {
    const id = req.params.id;
    const orders = await Orders.selectByUserId(id);
    if (orders) {
        const groupedObject = {};

        orders.forEach(order => {
            const { id, orderDateTime, userId, name, size, quantity, imageUrl, amount } = order;

            if (!groupedObject[id]) {
                groupedObject[id] = {
                    id,
                    orderDateTime,
                    userId,
                    amount,
                    products: []
                };
            }

            groupedObject[id].products.push({
                name,
                size,
                quantity, 
                imageUrl
            });
        });

        res.json(Object.values(groupedObject));
    } else {
        res.status(404).json({ error: 'No orders found.' })
    }
}

module.exports = {
    getAllByUserId,
}