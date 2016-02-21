var User   = require(appRoot+"/app/models/user.model.js");
var Demand = require(appRoot+"/app/models/demand.model.js");
var bcrypt = require("bcrypt");

exports.isUndef = function(item){
	return item === undefined || item === null;
};

exports.getUser = function(username, req, res, next){
	var resp = {};

	// Validate input
	if(username != ""){
		User.findByUsername(username, function(result){
			if(result !== null){
				resp.result  = result;
				resp.success = "Request was successful";
				res.json(resp);
				res.end();
			}else{
				resp.error = "User does not exist";
				resp.code  = 404;
				res.json(resp);
				res.end();
			}
		});
	}else{
		resp.error = "Username cannot be empty";
		resp.code  = 400;
		res.json(resp);
		res.end();	
	}
};

exports.createUser = function(data, req, res, next){
	var resp = {};
	
	// Validate input
	if((global.usernameRegex).test(data.username)){
		if(User.findByUsername(data.username) === null){
			if((global.passwordRegex).test(data.password)){
				if((global.individNameRegex).test(data.fname)){
					if((global.individNameRegex).test(data.lname)){
						// TODO: Make sure it isn't a duplicate email
						if((global.emailRegex).test(data.email)){
							var salt = bcrypt.genSaltSync(10);
							data.password = bcrypt.hashSync(data.password, salt);

							var tempUser = new User(data);
							tempUser.push();
							resp.success = "Successful";
							res.json(resp);
							res.end();
						}else{
							resp.error = "Invalid email format";
						}		
					}else{
						resp.error = "Invalid characters in the last name";
					}
				}else{
					resp.error = "Invalid characters in the first name";		
				}
			}else{
				resp.error = "Invalid characters in the password";
			}
		}else{
			resp.error = "Username is already taken";	
		}
	}else{
		resp.error = "Invalid characters in the username";
	}
	
	resp.code = 400;
	res.json(resp);
	res.end();
};

exports.updateUser = function(data, req, res, next){
	// Validate input
};

exports.deleteUser = function(username, req, res, next){
	// Validate input
};

exports.getDemand = function(id, req, res, next){
	var resp = {};
	
	// Validate input
	if(global.onlyIntsRegex.test(id)){
		Demand.findById(id, function(result){
			if(result !== null){
				resp.result  = result;
				resp.success = "Request was successful";
				res.json(resp);
				res.end(); 
			}else{
				resp.error = "No demand that matches the ID";
				resp.code  = 400;
				res.json(resp);
				res.end();	
			}
		});
	}else{
		resp.error = "Invalid ID";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};

exports.createDemand = function(data, req, res, next){
	var resp = {};	

	// Validate input
	
};

exports.updateDemand = function(data, req, res, next){
	// Validate input
};

exports.deleteDemand = function(id, req, res, next){
	// Validate input
}
