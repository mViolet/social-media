const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const connectDB = require('./config/database.js')
const PORT = 3000

connectDB()

require("dotenv").config({ path: "./config/.env" })
require('./config/passport')(passport)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', homeRoutes)


//passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server now running on ${PORT}`);
})