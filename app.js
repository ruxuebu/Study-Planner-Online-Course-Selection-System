const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const passport = require("passport");
var session = require("express-session");
var flash = require('connect-flash');

const configRoutes = require("./routes");
const configDB = require("./config/mongoConnection");

const static = express.static(__dirname + '/public');

const morgan = require('morgan');
const mongoose = require('mongoose');

const port = process.env.PORT || 8080;

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
};


mongoose.connect(configDB.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));




app.use("/public", static);
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

