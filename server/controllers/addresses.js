const Addresses = require('../models/Addresses');
const Users = require('../models/Users');

// GET /users/{id}/address
async function getByUserId(req, res) {
    const id = req.params.id;
    const address = await Addresses.readByUserId(id);

    if (address[0]) {
        res.json(address[0]);
    } else {
        res.status(404).json({ error: 'No address found' })
    }
}

// POST /users/:id/addresses
async function addOne(req, res) {
    const { city, street, number, zipCode, floor, apartmentNumber } = req.body;
    const userId = req.params.id;

    const address = await Addresses.insert(city, street, number, zipCode, floor, apartmentNumber);
    if(address) {
        const id = address['insertId'];
        await Users.updateAddressForUser(userId, id);

        res.status(201).json({ message: 'Address added successfully with id: ' + id + '.' });
    } else {
        res.status(500).json({ error: 'Address creation failed.' })
    }
}

// PUT /addresses/:id
async function updateById(req, res) {
    const { city, street, number, zipCode, floor, apartmentNumber } = req.body;
    const id = req.params.id;

    const address = await Addresses.updateById(id, city, street, number, zipCode, floor, apartmentNumber);

    if(address['affectedRows']) {
        res.status(200).json({ message: 'Address updated successfully.' });
    } else {
        res.status(500).json({ error: 'Address update failed.' })
    }
}

module.exports = {
    getByUserId,
    addOne,
    updateById
}