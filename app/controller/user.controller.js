var funcs = require(appRoot+"/config/global_functions.js"); 

exports.getUser = function(req, res, next){
	var body = req.body;
	var resp = {};

	if(!funcs.isUndef(body.username)){
		funcs.getUser(body.username, req, res, next);				
	}else{
		resp.error = "Invalid use of api";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};

exports.postUser = function(req, res, next){
	var body = req.body;
	var resp = {};

	if(!funcs.isUndef(body.username) && !funcs.isUndef(body.email) && !funcs.isUndef(body.password)){
		funcs.createUser(body, req, res, next);
	}else{
		resp.error = "Invalid use of api";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};

exports.putUser = function(req, res, next){
	var body = req.body;
	var resp = {};	

	if(!funcs.isUndef(body.username) || !funcs.isUndef(body.email) || !funcs.isUndef(body.password)){
		funcs.updateUser(body, req, res, next);
	}else{
		resp.error = "Invalid use of api";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};

exports.deleteUser = function(req, res, next){
	var body = req.body;
	var resp = {};

	if(!funcs.isUndef(body.username)){
		funcs.deleteUser(body.username, req, res, next);
	}else{
		resp.error = "Invalid use of api";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};
