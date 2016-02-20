module.exports = function(app){
	app.get("/main", function(req, res){
		res.send("Sup?");
	});
};
