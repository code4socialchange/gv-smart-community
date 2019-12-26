const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {

    const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    try {

        if (process.env.SERVERTYPE == 'ONLINE') {
            jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
                if (err) throw err;
                req.user = decoded;
                next();
                // if (decoded.role === 'administrator') { 
                // } else { throw 'err' }
            });
        } else {
            jwt.verify(token, process.env.JWTSECRET, { audience: 'gvapp' }, (err, decoded) => {
                req.user = decoded;
                next();
            });
        }


    } catch(err) {
        
        res.status(401).json({
            statusCode: 401,
            messsage: 'Unauthorized'
        })
        
    }
}

module.exports = { jwtMiddleware }
