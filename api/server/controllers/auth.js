const logger = require('./../../logger');
const db = require('./../../models/index');
const bcrypt = require('bcrypt');
const Token = require('./../../token-generator');

const authenticate = async(req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;
    const source = req.body.source || 'offline';

    try {

        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD && source !== 'offline') {

            const user = {
                firstName: 'Administrator',
                lastName: 'GV',
                phone: 123456,
                role: 'administrator',
                active: true
            }

            return res.status(200).json({
                success: true,
                user: user,
                token: await Token.generator(user)
            });

        }
        
        await db.User.findOne({ where: { phone: username } }).then(async(user) => {

            const passwordCompared = await bcrypt.compare(password, user.password);

            if (!passwordCompared) {
                throw Error('Wrong credentials');
            }

            if (source == 'portal' && user.role == 'administrator') {
                
                user = JSON.parse(JSON.stringify(user));
                delete user.password;
                
                return res.status(200).json({
                    success: true,
                    user: user,
                    token: await Token.generator(user)
                });

            } else if (source == 'offline' && user.role !== 'administrator') {

                user = JSON.parse(JSON.stringify(user));
                delete user.password;

                const token = await Token.generator(user);
                
                return res.status(200).json({
                    success: true,
                    user: user,
                    token: token
                });

            } else {
                // nothing
            }
    
        })

    } catch (error) {
        
        logger.error('Error authenticating user ', error);

        return res.status(403).json({
            success: false,
            message: 'Wrong credentials'
        });

    }

}

module.exports = { authenticate }