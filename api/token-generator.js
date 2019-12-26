const jwt = require('jsonwebtoken');

const generator = (payload) => {

    const options = {
        expiresIn: "30d",
        issuer: 'gvsmartcomm',
        noTimestamp: false,
        jwtid: (Date.now()).toString()
    }

    if (payload.role == 'administrator') options.audience = 'gvadmin'
    else options.audience = 'gvapp';
    
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWTSECRET, options, (err, token) => {
            if (err) return reject()
            resolve(token)
        })
    })

}

const refresh = (token) => {
    const payload = jwt.verify(token, public_cert);
    delete payload.iat;
    delete payload.exp;
    delete payload.jti;

    jwt.sign(payload, private_cert, {
        jwtid: (Date.now()).toString()
    }, (err, token) => {
        if (err) return 'err';
        return token;
    })
}

module.exports = { generator, refresh };