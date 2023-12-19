const connection = require('../mysql/config')

const register = (req, res) => {
    var email = req.body.email
    connection.query('SELECT * FROM users WHERE email = ?', [email], 
    function (err, data) {
        if (err) {
            return res.json('Problem occur while connecting to database!')
        }
        else {
            if(data.length > 0) {
                return res.json({warning : 'User already exist!'})
            }
            else {
                const sql = 'INSERT INTO users (`name`, `email`, `password`) VALUES (?)'
                const values = [
                    req.body.name,
                    req.body.email,
                    req.body.password
                ]
                connection.query(sql, [values], (err, data) => {
                    if(err) {
                        return res.json('Error while registering data!')
                    }
                    else {
                        return res.json({success : 'Data registered successfully'})
                    }
                })
            }
        }
    })
}

module.exports = register