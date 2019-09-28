const express = require('express');
const router = express.Router();

const UserRoute = require('./routes/user');

router.get('/status', (req, res) => res.send('OK'));

router.use('/user', UserRoute);
// router.use('/message', MessageRoute);


module.exports = router;