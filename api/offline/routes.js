const express = require('express');
const router = express.Router();

const AuthRoute = require('./routes/auth');
const UserRoute = require('./routes/user');
const MessageRoute = require('./routes/message');
const SyncRoute = require('./routes/sync');
const BlogRoute = require('./routes/blog');

router.get('/status', (req, res) => res.status(200).json({ status: 'OK', type: 'OFFLINE' }));

router.use('/auth', AuthRoute);
router.use('/user', UserRoute);
router.use('/blog', BlogRoute);
router.use('/message', MessageRoute);
router.use('/sync', SyncRoute);


module.exports = router;