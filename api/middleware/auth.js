const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {

    const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    try {

        jwt.verify(token, process.env.JWTSECRET, { audience: 'gvadmin' }, function(err, decoded) {
            if (decoded.role === 'administrator') { 
                next();
            } else { throw 'err' }
        });

    } catch(err) {
        
        res.status(401).json({
            statusCode: 401,
            messsage: 'Unauthorized'
        })
        
    }
}

module.exports = { jwtMiddleware }
