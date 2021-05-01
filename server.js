const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')(session)
const homeRoutes = require('./routes/home')
const feedRoutes = require('./routes/feed')
const connectDB = require('./config/database.js')
const PORT = 3000

// require("dotenv").config({ path: "./config/.env" })

connectDB()

require('./config/passport')(passport)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', homeRoutes)
app.use('/feed', feedRoutes)

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server now running on ${PORT}`);
})