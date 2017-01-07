const express = require('express');
const router = express.Router();
const passport = require("passport");
const data = require("../data");
const users= data.users;
var configPassport = require("../config/passportStrategy");

configPassport(passport);
let isLoggedIn = require("../config/loginCheck");


router.get('/login', function(req, res) {
   	res.render('pages/login.ejs', { message: req.flash('loginMessage')}); 
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/account', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
}));

router.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('pages/signup.ejs', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/account', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/account', isLoggedIn, function(req, res){
    res.render('pages/account.ejs',{
        user: req.user
    });
});

module.exports = router;

