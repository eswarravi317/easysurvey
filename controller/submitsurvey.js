const connection = require('../mysql/config')
const user = require('../bean/user')

const submitsurvey = (req, res) => {
    var email = req.body.email
    var tname = req.body.tname
    var values = req.body.formValues
    if(typeof email != 'undefined' && typeof tname != 'undefined' && typeof values != 'undefined') {
        var selectSql = 'SELECT * FROM '+tname.toLowerCase()+' WHERE email = ?'
        connection.query(selectSql, [email], function(selectErr, selectRes) {
            if(selectErr) {
                return res.json({error: 'Problem while connecting with database!'})
            }
            else if(selectRes.length > 0) {
                return res.json({warning: "You're already submitted survey!"})
            }
            else {
                const insertSql = 'INSERT INTO '+tname+' (`email`) VALUES (?)'
                connection.query(insertSql, [email], (insertErr, insertRes) => {
                    if(insertErr) {
                        return res.json({error: 'Error while inserting data!'})
                    }
                    else {
                        for(i=0; i<values.length; i++) {
                            connection.query('UPDATE '+tname+' SET column'+(i+1)+' = ? WHERE email = ?', [values[i], email], (insErr, insRes) => {
                                // if(insErr) {
                                //     return res.json({error: 'Error while inserting data!'})
                                // }
                            })
                        }
                        return res.json({success: 'Survey submitted'})
                    }
                })
            }
        })
    }
}

module.exports = submitsurvey