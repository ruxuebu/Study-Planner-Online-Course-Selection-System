var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var passport = require("passport");
var session = require("express-session");
var flash = require('connect-flash');

var configRoutes = require("./routes");
var configDB = require("./config/mongoConnection");

var statics = express.static(__dirname + '/public');

var morgan = require('morgan');
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;

var rewriteUnsupportedBrowserMethods = (req, res, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
};


mongoose.connect(configDB.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));




app.use("/public", statics);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.set("view engine", "ejs");

app.use(session({
	secret: 'keyboard cat',
	resave: true, 
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

configRoutes(app);

app.listen(port, ()=>{
	console.log("server is running on http://localhost:"+ port);
});

