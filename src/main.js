// Module imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Classes
const Response = require('./classes/Response');

// Wrappers
const logger = require('./wrappers/logger');

// Object inits
const app = express();

// Server variables
const port = process.env.TIME_TRACKER_PORT || 3001;
const env = process.env.NODE_ENV || 'development';

// App middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    const response = new Response(200, { ok: true });

    res.status(response.statusCode).json(response.generateJSON());
});

app.all('*', (req, res) => {
    res.status(404).send();
});

// Server listen
app.listen(port, () => {
    logger.info(`time tracker started on port ${port} in ${env} mode`);
});
