const express = require('express');
const router = express.Router();

const UserRoute = require('./routes/user');
const MessageRoute = require('./routes/message');
const SyncRoute = require('./routes/sync');


router.get('/status', (req, res) => res.send('OK'));

router.use('/user', UserRoute);
// router.use('/message', MessageRoute);
router.use('/sync', SyncRoute);


module.exports = router;