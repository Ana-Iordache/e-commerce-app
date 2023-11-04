const Users = require('../models/Users');
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

module.exports = {
    getAll,
    getByEmail,
    addOne,
}