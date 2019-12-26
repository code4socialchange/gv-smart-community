const express = require('express');
const router = express.Router();
const authController = require('./../../server/controllers/auth');

router
	.route('/')
	.post(authController.authenticate)

module.exports = router;
