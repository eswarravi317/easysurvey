const connection = require('../mysql/config')

const removeFav = (req, res) => {
    var tname = req.body.tname
    var updateSql = 'UPDATE surveylist SET favourite="false" WHERE tablename=?'
    connection.query(updateSql, [tname], function(updateErr, updateRes) {
        if(updateErr) {
            return res.json({error: 'Error while updating!'})
        }
        else {
            return res.json({success: 'Removed from favourites'})
        }
    })
}

module.exports = removeFav