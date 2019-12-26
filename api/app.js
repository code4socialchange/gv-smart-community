// Loading .env
require('dotenv-safe').config({ allowEmptyValues: true });

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const logger = require('./logger');
const models = require('./models/index');
const middleware = require('./middleware/auth');

const syncController = require('./offline/controller/sync');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(helmet());
app.use(cors());

// app.use(express.static(path.join(__dirname, '../videos/')));
app.use('/videos', (req, res) => {
	res.sendFile(path.join(__dirname, '../videos/' + req.path));
}); 
// app.use('/videos', express.static(path.join(__dirname, '../videos')));

// Only for Production load Angular App
if (process.env.NODE_ENV == 'production' && process.env.SERVERTYPE == 'ONLINE') {
	app.use(express.static(path.join(__dirname, '../dist')));
	app.use(/^((?!(api)).)*/, (req, res) => {
		res.sendFile(path.join(__dirname, '../dist/index.html'));
	}); 
	// app.use(/^((?!(videos)).)*/, (req, res) => {
	// 	res.sendFile(path.join(__dirname, '../videos/' + req.baseUrl));
	// }); 
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const jwtMiddleware = ((req, res, next) => {
	if (req.path === '/api/auth' || req.path === '/api/status') return next();
	middleware.jwtMiddleware(req, res, next);
});


if (process.env.SERVERTYPE == 'OFFLINE') {
	app.use(jwtMiddleware);
	app.use('/api', require('./offline/routes'));
} else {
	app.use(jwtMiddleware);
	app.use('/api', require('./server/routes'));
}


app.use(function (err, req, res, next) {
	console.log(err);
});

models.sequelize.sync().then(async () => {

	const checkSyncAvailable = await syncController.fistRunSync();
	if (checkSyncAvailable === 'SYNCLIST_ERROR') throw checkSyncAvailable;

	console.log('SYNC ', checkSyncAvailable);
	app.listen(3000, '192.168.0.107' || 'localhost', () => logger.info(`Server started successfully on port 3000`));
	// app.listen(3000, 'localhost', () => logger.info(`Server started successfully on port 3000`));
}).catch((error) => {
	logger.error('Error', error.message)
});