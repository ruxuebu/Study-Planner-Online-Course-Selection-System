const express = require('express');
const router = express.Router();
// const passport = require("passport");
const data = require("../data");
const users= data.users;
// var configPassport = require("../config/passportStrategy");

// configPassport(passport);
let isLoggedIn = require("../config/loginCheck");

router.get("/profile", isLoggedIn, function(req, res){
	res.render("pages/profile.ejs",{
		user: req.user,
		message: req.flash('message')
	});
});

router.get("/edit", isLoggedIn, function(req, res) {
        res.render("pages/edit.ejs", {
            user : req.user // get the user out of session and pass to template
        });
    });

router.post("/edit", isLoggedIn, function (req, res){
        User.findOne({ 'local.email' :  req.user.local.email }, function(err, user) {
            if (err){ return done(err);}
            if (user){
                user.updateUser(req, res);
                req.flash('message', "Your profile is updated");
                res.redirect("/profile");
            }

        });
});
router.get("/passwords", isLoggedIn, function(req,res){
	res.render("pages/passwords.ejs", {
		user: req.user,
		message: req.flash("passwordError")
	});
});

router.post("/passwords", isLoggedIn, function(req, res){
	User.findOne({"local.email": req.user.local.email}, function(err, user){
		if(err){return done(err);}
		if(user){
				var password = user.hashPassword(req.body.password)
			if(req.body.password == req.body.password2 && user.validPassword(req.body.oldPassword)){
				user.resetPassword(password);
				req.flash("message", "Your password is successfully changed");
				res.redirect("/profile")
			}
			else{
				req.flash(
					"passwordError", 
					"the old password you entered doesn't match our record"
					);
				res.redirect("/passwords");
				
			 }
		}
	});
});

router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
})


module.exports = router;