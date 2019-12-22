const express = require('express');
const router = express.Router();
const syncController = require('./../controller/sync');

router
    .route('/')
    .post(syncController.syncFromLocal)

module.exports = router;