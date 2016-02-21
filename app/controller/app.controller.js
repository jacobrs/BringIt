var funcs = require(appRoot+"/config/global_functions.js");

exports.showApp = function(req, res, next){
	res.render("app", {username: req.session.username, fname: req.session.fname});
};
