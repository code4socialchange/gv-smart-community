const express = require('express');
const router = express.Router();

router
    .route('/')
    .get()
    .post()
    .delete()

router
    .route('/profile')
    .get()
    .post()

router
    .route('/:userId')
    .get()
    .put()
    .patch()

module.exports = router;
