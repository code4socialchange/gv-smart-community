const express = require('express');
const router = express.Router();

const AuthRoute = require('./routes/auth');
const UserRoute = require('./routes/user');
const MessageRoute = require('./routes/message');
const VillageRoute = require('./routes/village');
const BlogRoute = require('./routes/blog');

router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', AuthRoute);
router.use('/user', UserRoute);
router.use('/blog', BlogRoute);
router.use('/message', MessageRoute);
router.use('/village', VillageRoute);

module.exports = router;