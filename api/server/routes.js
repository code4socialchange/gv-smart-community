const express = require('express');
const router = express.Router();

const AuthRoute = require('./routes/auth');
const UserRoute = require('./routes/user');
const MessageRoute = require('./routes/message');
const VillageRoute = require('./routes/village');
const BlogRoute = require('./routes/blog');
const SyncRoute = require('./routes/sync');

router.get('/status', (req, res) => res.json({ status: 'OK', type: 'ONLINE' }));

router.use('/sync', SyncRoute);
router.use('/auth', AuthRoute);
router.use('/user', UserRoute);
router.use('/blog', BlogRoute);
router.post('/uploadvideo', require('./controllers/blog').uploadFile);
router.use('/message', MessageRoute);
router.use('/village', VillageRoute);

module.exports = router;