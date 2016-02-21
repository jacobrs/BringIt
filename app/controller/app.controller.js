exports.showApp = function(req, res, next){
	res.render("app", {username: "tester", fname: "Jacob"});
};
