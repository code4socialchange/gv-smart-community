const express = require('express');
const router = express.Router();

router
    .route('/')
    .get()
    .post()

router
    .route('/profile')
    .get()

router
    .route('/:userId')
    .get()
    .put()
    .patch()

module.exports = router;
