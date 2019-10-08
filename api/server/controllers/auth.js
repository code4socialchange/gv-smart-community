const logger = require('./../../logger');
const db = require('./../../models/index');
const bcrypt = require('bcrypt');
const Token = require('./../../token-generator');

const authenticate = async(req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;
    const source = req.body.source || 'offline';

    try {
        
        await db.User.findOne({ where: { phone: username } }).then(async(user) => {

            const passwordCompared = await bcrypt.compare(password, user.password);

            if (!passwordCompared) {
                throw Error('Wrong credentials');
            }

            if (source == 'portal' && user.role == 'administrator') {
                
                delete user.password;

                user = JSON.parse(JSON.stringify(user));

                const token = await Token.generator(user);
                
                return res.status(200).json({
                    success: true,
                    user: user,
                    token: token
                });

            }
    
        })

    } catch (error) {
        
        logger.error('Error authenticating user ', error);

        return res.status(500).json({
            success: false,
            message: 'Wrong credentials'
        });

    }

}

module.exports = { authenticate }