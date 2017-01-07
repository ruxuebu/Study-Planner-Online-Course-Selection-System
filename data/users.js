var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String,
        lastname: String,
        firstname: String,
        schoolid: String,
        phone: String
    },

    form: {
    	lastname: String,
    	firstname: String,
    	schoolid: String,
    	major: String,
    	department: String,
      	degree: String,
      	concentration: String,
      	gradyear: String,
      	gradterm:String,
      	OPT: String,
        courseList:[{
  	    	number: String,
  	    	name: String,
  	    	year: String,
  	    	term: String
    	   }]
    }

});

userSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.updateUser = function(req, res){
  this.local.lastname = req.body.lastname;
  this.local.firstname = req.body.firstname;
  this.local.schoolid = req.body.schoolid;
  this.local.phone = req.body.phone;
  this.local.save();
};

userSchema.methods.updateForm = function(req, res){
  this.form.lastname = req.body.lastname;
  this.form.firstname = req.body.firstname;
  this.form.schoolid = req.body.schoolid;
  this.form.major = req.body.major;
  this.form.department = req.body.department;
  this.form.concentration = req.body.concentration;
  this.form.degree = req.body.degree;
  this.form.gradyear = req.body.gradyear;
  this.form.gradterm = req.body.gradterm;
  this.form.OPT = req.body.OPT;
  this.form.save();
};

userSchema.methods.resetPassword = function(password){
  this.local.password = password;
  this.local.save();
};

userSchema.methods.addCourse = function(array){
	this.form.courseList = array;
	this.form.save();
};

module.exports = mongoose.model('User', userSchema);