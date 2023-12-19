const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.body.headers.authorization
    if(authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWTSECRETKEY, (err, data) => {
            if(err) {
                return res.sendStatus(403)
            }
            next()
        })
    }
    else {
        res.sendStatus(401)
    }
}

module.exports = authenticateJWT