const connection = require('../mysql/config')

const addFav = (req, res) => {
    var tname = req.body.tname
    var updateSql = 'UPDATE surveylist SET favourite="true" WHERE tablename=?'
    connection.query(updateSql, [tname], function(updateErr, updateRes) {
        if(updateErr) {
            return res.json({error: 'Error while updating!'})
        }
        else {
            return res.json({success: 'Added to favourites'})
        }
    })
}

module.exports = addFav