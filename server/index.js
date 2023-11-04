const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../config.json');
const port = config.BACKEND_PORT;
const routes = require('./router/routes');
const cors = require('cors');

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

app.use('/', routes)