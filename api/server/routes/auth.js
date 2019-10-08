const express = require('express');
const router = express.Router();
const authController = require('./../controllers/auth');

router
	.route('/')
	.post(authController.authenticate)

// router
// 	.route('/logout')
// 	.post()

module.exports = router;
