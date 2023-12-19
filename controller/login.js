const connection = require('../mysql/config')
const jwt = require('jsonwebtoken')
const user = require('../bean/user')
require('dotenv').config()

const login = (req, res) => {
    var email = req.body.email
    connection.query('SELECT * FROM users WHERE email = ?', [email], 
    function (err, data) {
        if (err) {
            return res.json('Problem occur while connecting to database!')
        }
        else {
            if(data.length < 1) {
                return res.json({warning : 'User doesn\'t exist!'})
            }
            else {
                var password = req.body.password
                connection.query('SELECT * FROM users WHERE email = ? and password = ?', [email, password],
                function(error, result) {
                    if(error) {
                        return res.json('Problem occur while connecting to database!')
                    }
                    else if(result.length > 0) {
                        const token = jwt.sign({email: email}, process.env.JWTSECRETKEY, {expiresIn: '1d'})
                        user.sno = result[0].sno
                        user.name = result[0].name
                        user.email = result[0].email
                        return res.json({success : 'Login success', token: token})
                    }
                    else {
                        return res.json({warning : 'Password might be wrong!'})
                    }
                })
            }
        }
    })
}

module.exports = login