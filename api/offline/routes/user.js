const express = require('express');
const router = express.Router();

const profileController = require('./../../server/controllers/user');
const userController = require('./../../server/controllers/user');

router
    .route('/')
    .get(userController.getAllFiltered)
    .post()

module.exports = router;
