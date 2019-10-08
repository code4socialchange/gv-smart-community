// Loading .env
require('dotenv-safe').config({ allowEmptyValues: true });

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('./logger');
const models = require('./models/index');
const middleware = require('./middleware/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

if (process.env.SERVERTYPE == 'OFFLINE') {
	app.use('/api', require('./offline/routes'));
} else {

	const jwtMiddleware = ((req, res, next) => {
		if (req.path === '/api/auth' || req.path === '/api/status') return next();
		middleware.jwtMiddleware(req, res, next);
	});

	app.use(jwtMiddleware);
	app.use('/api', require('./server/routes'));
}

models.sequelize.sync().then(() => {
	app.listen(3000, () => logger.info(`Server started successfully on port 3000`));
}).catch((error) => {
	logger.error('Error', error.message)
});