const connection = require('../mysql/config')
const user = require('../bean/user')

const home = (req, res) => {
    var selectSql = 'SELECT * FROM surveylist WHERE creator = ?'
    connection.query(selectSql, [user.email], function(selectErr, selectRes) {
        if(selectErr) {
            return res.json({error: 'Error while fetching data!'})
        }
        else {
            return res.json({user : user.name, surveyList : selectRes})
        }
    })
}

module.exports = home