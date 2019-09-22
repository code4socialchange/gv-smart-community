// Loading .env
require('dotenv-safe').config();

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('./logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(helmet());
app.use(cors());

if (process.env.SERVERTYPE == 'OFFLINE') {
    app.use('/api', require('./offline/routes'));
} else {
    app.use('/api', require('./offline/routes'));
}

app.listen(3000, () => logger.info(`Server started successfully on port 3000`));