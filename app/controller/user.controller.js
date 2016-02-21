var funcs = require(appRoot+"/config/global_functions.js"); 

exports.getUser = function(req, res, next){
	var resp = {};

	if(!funcs.isUndef(req.params.username)){
		funcs.getUser(req.params.username, res);				
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

	if(!funcs.isUndef(body.username) && !funcs.isUndef(body.fname) && !funcs.isUndef(body.email) && 
	   !funcs.isUndef(body.password) && !funcs.isUndef(body.lname)){
		funcs.createUser(body, req, res);
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

	if(!funcs.isUndef(body.username) && (!funcs.isUndef(body.fname) || !funcs.isUndef(body.email) || 
		!funcs.isUndef(body.password) || !funcs.isUndef(body.lname))){
		funcs.updateUser(body, res);
	}else{
		resp.error = "Invalid use of api";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};

exports.deleteUser = function(req, res, next){
	var resp = {};

	if(!funcs.isUndef(req.params.username)){
		funcs.deleteUser(req.params.username, res);
	}else{
		resp.error = "Invalid use of api";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};
