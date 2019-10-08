const express = require('express');
const router = express.Router();

const userController = require('./../controllers/user');

router
	.route('/')
	.get(userController.getAll)
	.post(userController.addUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser)

router
	.route('/:userId')
	.get(userController.getUserFromId)

module.exports = router;
