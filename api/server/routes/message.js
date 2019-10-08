const express = require('express');
const router = express.Router();

const messageeController = require('./../controllers/message');

router
	.route('/')
	.get(messageeController.getMessages)

module.exports = router;
