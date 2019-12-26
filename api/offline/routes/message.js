const express = require('express');
const router = express.Router();

const blogController = require('./../../server/controllers/message');

router
	.route('/')
    .post(blogController.addMessages)
    .get(blogController.getMessages)

module.exports = router;
