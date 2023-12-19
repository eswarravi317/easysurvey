const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connection = require('./mysql/config')
const register = require('./controller/register')
const login = require('./controller/login')
const authenticateJWT = require('./middleware/authenticate')
const user = require('./bean/user')
const createSurvey = require('./controller/createSurvey')
const home = require('./controller/home')
const addFav = require('./controller/addFav')
const removeFav = require('./controller/removeFav')
const favourites = require('./controller/favourites')
const opensurvey = require('./controller/opensurvey')
const fillsurvey = require('./controller/fillsurvey')
const submitsurvey = require('./controller/submitsurvey')
const profile = require('./controller/profile')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

// user register
app.post('/register', register)

// user login
app.post('/login', login)

// home
app.get('/home', authenticateJWT, home)

// favourites
app.get('/favourites', authenticateJWT, favourites)

// create survey
app.post('/createsurvey', authenticateJWT, createSurvey)

// add favourite
app.post('/addfav', authenticateJWT, addFav)

// remove favourite'
app.post('/removefav', authenticateJWT, removeFav)

// edit survey
app.get('/editsurvey/:tname', authenticateJWT, opensurvey)

// fill survey
app.get('/fillsurvey/:tname', fillsurvey)

// submit survey
app.post('/submitsurvey', submitsurvey)

// profile
app.get('/profile', authenticateJWT, profile)

app.listen(process.env.PORT, () => {
    console.log('Server running at port 5000')
    connection
})