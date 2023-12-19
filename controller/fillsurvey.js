const connection = require('../mysql/config')
const user = require('../bean/user')

const fillsurvey = (req, res) => {
    var tname = req.params.tname;
    var selectSql = 'SELECT * FROM surveylist WHERE creator = ? and tablename = ?'
    connection.query(selectSql, [user.email, tname.toLowerCase()], function(selectErr, selectRes) {
        if(selectErr) {
            return res.json({error: 'Error while fetching data!'})
        }
        else {
            return res.json({surveyData : selectRes})
        }
    })
}

module.exports = fillsurvey