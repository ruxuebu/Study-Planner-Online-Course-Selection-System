var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
	courseName: String,
	courseNumber: String,
	courseMajor: String,	
	level: Number,
	credit: Number,
})

var data = require("./template.json");
console.log(data.course[1]);
