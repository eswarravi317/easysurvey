const connection = require('../mysql/config')
const user = require('../bean/user')

const opensurvey = (req, res) => {
    var tname = req.params.tname;
    var selectSql = 'SELECT * FROM surveylist WHERE creator = ? and tablename = ?'
    connection.query(selectSql, [user.email, tname.toLowerCase()], function(selectErr, selectRes) {
        if(selectErr) {
            return res.json({error: 'Error while fetching data!'})
        }
        else {
            connection.query('SELECT * FROM '+tname, function(dataErr, dataRes) {
                if(!dataErr) {
                    return res.json({surveyData : selectRes, surveyResult: dataRes})
                }
            })
        }
    })
}

module.exports = opensurvey