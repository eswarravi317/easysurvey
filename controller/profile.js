const user = require('../bean/user')

const profile = (req, res) => {
    return res.json({name: user.name, email: user.email})
}

module.exports = profile