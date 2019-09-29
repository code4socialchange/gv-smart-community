const express = require('express');
const router = express.Router();

const UserRoute = require('./routes/user');
const MessageRoute = require('./routes/message');
const VillageRoute = require('./routes/village');

router.get('/status', (req, res) => res.send('OK'));

router.use('/user', UserRoute);
router.use('/message', MessageRoute);
router.use('/village', VillageRoute);

module.exports = router;