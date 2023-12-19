const connection = require('../mysql/config')
const user = require('../bean/user')

const favourites = (req, res) => {
    var selectSql = 'SELECT * FROM surveylist WHERE creator = ? and favourite = ?'
    connection.query(selectSql, [user.email, 'true'], function(selectErr, selectRes) {
        if(selectErr) {
            return res.json({error: 'Error while fetching data!'})
        }
        else {
            return res.json({surveyList : selectRes})
        }
    })
}

module.exports = favourites