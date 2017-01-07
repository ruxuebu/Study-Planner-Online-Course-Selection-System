const authRoutes = require("./auth");
const profileRoutes = require("./profile");
const formRoutes =  require("./form");
const constructorMethod = (app) => {
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