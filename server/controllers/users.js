const Users = require('../models/Users');
const Addresses = require('../models/Addresses');
const bcrypt = require('bcrypt');

// GET /users
async function getAll(req, res) {
    const users = await Users.selectAll();

    if (users) {
        res.json(users);
    } else {
        res.status(404).json({ error: 'No users found.' })
    }
}

// GET /users/{email}
async function getByEmail(req, res) {
    const email = req.params.email;
    const user = await Users.selectByEmail(email);

    if (user[0]) {
        res.json(user[0]);
    } else {
        res.status(404).json({ error: 'No user found.' })
    }
}

// POST /users
async function addOne(req, res) {
    // console.log("DEBUG: req.body ", req.body)
    const { name, surname, phoneNumber, email, password, isAdmin } = req.body;

    if (!name || !surname || !phoneNumber || !email || !password) {
        return res.status(400).json({ error: 'One or more required properties are missing.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.insert(name, surname, phoneNumber, email, hashedPassword, isAdmin);

    if (user) {
        let id = user['insertId'];
        res.status(201).json({ message: 'User created successfully with id: ' + id + '.' });
    } else {
        req.status(500).json({ error: 'User creation failed.' })
    }
}

// PUT /users/{id}
async function updateById(req, res) {
    const { name, surname, phoneNumber, email, password, address, addressId } = req.body;
    const id = req.params.id;

    if (!name || !surname || !phoneNumber || !email) {
        return res.status(400).json({ error: 'One or more required properties are missing.' });
    }

    let hashedPassword;
    if(password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await Users.updateById(id, name, surname, phoneNumber, email, hashedPassword);
    if(user['affectedRows']) {
        if(address) {
            if(addressId) {
                await Addresses.updateById(addressId, address.city, address.street, address.number, address.zipCode, address.floor, address.apartmentNumber);
            } else {
                const address = await Addresses.insert(address.city, address.street, address.number, address.zipCode, address.floor, address.apartmentNumber);
                if(address['insertId']) {
                    await Users.updateAddressForUser(id, address['insertId']);
                }
            }
        }

        res.status(200).json({ message: 'User updated successfully.' });
    } else {
        req.status(500).json({ error: 'User update failed.' })
    }
}

module.exports = {
    getAll,
    getByEmail,
    addOne,
    updateById,
}