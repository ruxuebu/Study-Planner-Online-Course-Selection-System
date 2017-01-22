var express = require('express');
var router = express.Router();
var data = require("../data");
var users= data.users;
var courses = data.courses;
var xss = require('xss');
var pdffill = require("../config/pdffill");
var isLoggedIn = require("../config/loginCheck");

router.get("/form1", isLoggedIn, function(req, res){
	res.render("pages/form1.ejs",{
		user: req.user
	});
});


router.post('/form1',isLoggedIn, function(req,res){
	User.findOne({'local.email': req.user.local.email}, function(err, user){
		if(err) {return done(err);}
		if(user){
			user.updateForm(req,res);
			res.redirect('/form2');
		}
	});
});

router.get('/form2',isLoggedIn, function(req,res){
	res.render('pages/form2.ejs', {
		user: req.user,
		courseList: req.user.form.courseList,
		courses: courses
	});
});

router.post("/form2", isLoggedIn, function(req, res){
	User.findOne({'local.email': req.user.local.email}, function(err, user){
		if(err){return done(err);}
		if(user){
			var courseList = req.body.selectedCourse;
			user.addCourse(courseList);
		}
	});
	res.json({	success:true, 
			   	message: 
			   	'<div class="alert alert-success alert-dismissible fade in" role="alert" id = "savedMessage">'+
			   	'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
			   	+xss("Session has been saved")+ 
			   	'</div>'
			 });
});

router.get('/form3', isLoggedIn, function(req, res){
	User.findOne({'local.email':req.user.local.email},function(err,user){
	    if(err){return done(err);}
	    if(user){
	        var form = user.form;
	        var destination = '/home/ubuntu/studyplanner/public/userdoc/' + form.firstname + '_study_plan.pdf';
	        //var destination = '/home/pz/finalproject/public/userdoc/' + form.firstname + '_study_plan.pdf';
	        pdffill.fill(form,destination);
	        res.render('pages/form3.ejs', {
	            user : req.user 
	        });
	    }
	});
});



module.exports = router;