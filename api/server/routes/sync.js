const express = require('express');
const router = express.Router();

const syncController = require('./../../offline/controller/sync');

router
	.route('/')
	.post(syncController.syncFromServer)

module.exports = router;
