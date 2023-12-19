const connection = require('../mysql/config')
const user = require('../bean/user')

const createSurvey = (req, res) => {
    var formtitle = req.body.formtitle
    var questions = req.body.questions
    var expirydate = req.body.expirydate
    if(typeof formtitle != 'undefined' && typeof questions != 'undefined') {
        var selectSql = 'SELECT * FROM surveylist WHERE tablename = ?'
        connection.query(selectSql, [formtitle], function(selectErr, selectRes) {
            if(selectErr) {
                return res.json({error: 'Problem while connecting with database!'})
            }
            else if(selectRes.length > 0) {
                return res.json({warning: "You're trying to create survey with existing name!"})
            }
            else {
                var questionlist = ""
                for(i=0; i<questions.length-1; i++) {
                    questionlist += questions[i].question+","
                }
                questionlist += questions[questions.length-1].question

                const insertSql = 'INSERT INTO surveylist (`creator`, `tablename`, `columnname`, `expirydate`, `favourite`) VALUES (?)'
                const values = [
                    user.email,
                    formtitle,
                    questionlist,
                    expirydate,
                    'false'
                ]
                connection.query(insertSql, [values], (insertErr, insertRes) => {
                    if(insertErr) {
                        return res.json({error: 'Error while inserting data!'})
                    }
                    else {
                        var quesLength = questions.length
                        connection.query('CREATE TABLE '+formtitle+' (sno INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email varchar(50) NOT NULL)', function(createErr, createRes) {
                            if(createErr) {
                                return res.json({error: 'Error while creating data!'})
                            }
                            else {
                                for(j=1; j<=quesLength; j++) {
                                    connection.query('ALTER TABLE '+formtitle+' ADD column'+j+' varchar(255)', function(alterErr, alterRes) {
                                        if(alterErr) {
                                            return res.json({error: 'Error while alter data!'})
                                        }
                                    })
                                }
                                return res.json({success: 'Survey created'})
                            }
                        })
                    }
                })
            }
        })
    }
    else {
        return res.json({error: 'Data Error!'})
    }
}

module.exports = createSurvey