const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

exports.getSignup = (req, res) => {
    res.render('signup')
}