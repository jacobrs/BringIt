module.exports = function(app){
	app.get("/", function(req, res){
		res.render("index", { main: "Hello world!" });
	});

	app.get("/main", function(req, res){
		res.render("main", { main: "Sup?" });
	});
};
