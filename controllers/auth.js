const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

// This section checks if user on login page has logged in. if so , goes to main page, if not goes to login
exports.getLogin = (req, res) => { //need path for redirect if already logged in 
 // if (req.user) {
 //   return res.redirect('/')
 // }
  res.render('login', {
    title: 'Login'
  })
}

// This section parses data entered into login page, checks for valid existing user, then creates active session and sends to main page
exports.postLogin = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('/login')
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      req.flash('errors', info)
      return res.redirect('/login') 
    }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      req.flash('success', { msg: 'Success! You are logged in.' })
      res.redirect(req.session.returnTo || '/') //??????????  Path to page once user is validated and logged in
    })
  })(req, res, next)
}


// logs out user - ends session - and sends to main page
exports.logout = (req, res) => {
  req.logout()
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err)
    req.user = null
    res.redirect('/')
  })
}


// This section checks if user on signup page has logged in. if so , goes to main page, if not goes to signup
exports.getSignup = (req, res) => { //need path for redirect if already logged in 
  //  if (req.user){
  //     return res.redirect('/?????')
  //  }
    res.render('signup', {
    title: 'Create Account'
})
}

//This section parses data entered into signup page, checks for valid data and duplication in db, then posts to db
exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
  
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/')//??????????  Path to page once user is created and logged in
        })
      })
    })
  }