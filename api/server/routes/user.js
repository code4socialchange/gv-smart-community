const express = require('express');
const router = express.Router();

const userController = require('./../controllers/user');

router
	.route('/')
	.get(userController.getAll)
	.post(userController.updateUser)

router
	.route('/:userId')
	.get(userController.getUserFromId)
	.delete(userController.updateUser)

module.exports = router;
