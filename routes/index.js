var authRoutes = require("./auth");
var profileRoutes = require("./profile");
var formRoutes =  require("./form");
var constructorMethod = (app) => {
	app.use("/",formRoutes);
	app.use("/", authRoutes);
	app.use("/", profileRoutes);

	app.get("/", function(req, res){
		res.render("pages/home.ejs");
	})

	app.get("*", function(req, res){
		res.status(404).render("pages/404.ejs");
	})
};

module.exports = constructorMethod;