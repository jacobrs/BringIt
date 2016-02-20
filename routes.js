module.exports = function(app){
	app.get("/", function(req, res){
		res.send("Hello world!");
	});

	app.get("/main", function(req, res){
		res.send("Sup?");
	});
};
