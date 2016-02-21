var User   = require(appRoot+"/app/models/user.model.js");
var Demand = require(appRoot+"/app/models/demand.model.js");
var bcrypt = require("bcrypt");

exports.isUndef = function(item){
	return item === undefined || item === null;
};

exports.login = function(username, password, req, res){
	var resp = {};

	// Validate input
	if(username != ""){
		if(password != ""){
			User.findByUsername(username, function(result){
				if(result !== null){
					if(bcrypt.compareSync(password, result.password)){
						req.session.username = result.username;
						req.session.fname    = result.fname;
						req.session.lname    = result.lname;
						req.session.email    = result.email;

						req.session.regenerate(function(err){});

						resp.success = "Logged In";
						res.json(resp);
						res.end();
					}else{
						resp.errorType = "both";
						resp.error = "Username or password was incorrect";
						resp.code  = 400;
						res.json(resp);
						res.end();
					}
				}else{
					resp.errorType = "both";
					resp.error = "Username or password was incorrect";
					resp.code  = 400;
					res.json(resp);
					res.end();
				}
			});
		}else{
			resp.errorType = "password";
			resp.error = "Password cannot be empty";
			resp.code  = 400;
			res.json(resp);
			res.end();
		}
	}else{
		resp.errorType = "username";
		resp.error = "Username cannot be empty";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
}

exports.logout = function(req, res){
	var resp = {};

	req.session.destroy(function(err){});

	resp.success = "Logged out";
	res.json(resp);
	res.end();
}

exports.getUser = function(username, res){
	var resp = {};

	// Validate input
	if(username != ""){
		User.findByUsername(username, function(result){
			if(result !== null){
				result.password = null;
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

// Helper function that deals with a response and determines
// if the user should be created (and creates it) or not
exports.createUser = function(data, req, res){
	var resp = {};
	resp.errors = [];

	if(!global.usernameRegex.test(data.username)){
    resp.errors.push({
      errorType: "username",
      text:      "Invalid characters in the username"
    });
  }

	User.findByUsername(data.username, function(result){
		if(result !== null){
			if(data.username != ""){
				resp.errors.push({
      		errorType: "username",
      		text:      "Username is already taken"
    		});
			}
		}

		if(!global.passwordRegex.test(data.password)){
    	resp.errors.push({
      	errorType: "password",
      	text:      "Invalid characters in the password"
    	});
  	}

  	if(!global.individNameRegex.test(data.fname)){
    	resp.errors.push({
      	errorType: "fname",
      	text:      "Invalid characters in the first name"
    	});
  	}

  	if(!global.individNameRegex.test(data.lname)){
    	resp.errors.push({
      	errorType: "lname",
      	text:      "Invalid characters in the last name"
    	});
  	}

 		if(!global.emailRegex.test(data.email)){
    	resp.errors.push({
      	errorType: "email",
      	text:      "Invalid email format"
    	});
  	}

		User.findByEmail(data.email, function(result){
			if(result !== null){
				resp.errors.push({
        	errorType: "email",
        	text:      "Email is already taken"
      	});
			}

			if(resp.errors.length === 0){
				resp.errors = undefined;

				var salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);

        var tUser = new User(data);
				tUser.place();

				req.session.username = data.username;
				req.session.fname    = data.fname;
				req.session.lname    = data.lname;
				req.session.email    = data.email;

				req.session.regenerate(function(err){});

		    resp.success = "Successful";
				res.json(resp);
				res.end();
			}else{
				resp.code = 400;
				res.json(resp);
				res.end();
			}
		});
	});
};

exports.updateUser = function(data, req, res){
	// Validate input
	var resp = {};
	resp.errors = [];

	if(req.session.username !== data.username){
		resp.errors.push({
      errorType: "conflict",
      text:      "This account does not belong to you"
    });

		resp.code = 400;
		res.json(resp);
		res.end();
	}

	if(!global.usernameRegex.test(data.username)){
    resp.errors.push({
      errorType: "username",
      text:      "Invalid characters in the username"
    });
  }

	User.findByUsername(data.username, function(result){
		if(result === null){
			resp.errors.push({
    		errorType: "username",
    		text:      "This account does not belong to you"
  		});
		}

		if(!global.passwordRegex.test(data.password)){
    	resp.errors.push({
      	errorType: "password",
      	text:      "Invalid characters in the password"
    	});
  	}

  	if(!global.individNameRegex.test(data.fname)){
    	resp.errors.push({
      	errorType: "fname",
      	text:      "Invalid characters in the first name"
    	});
  	}

  	if(!global.individNameRegex.test(data.lname)){
    	resp.errors.push({
      	errorType: "lname",
      	text:      "Invalid characters in the last name"
    	});
  	}

 		if(!global.emailRegex.test(data.email)){
    	resp.errors.push({
      	errorType: "email",
      	text:      "Invalid email format"
    	});
  	}

		User.findByEmail(data.email, function(result){
			if(result !== null){
				resp.errors.push({
        	errorType: "email",
        	text:      "Email is already taken"
      	});
			}

			if(resp.errors.length === 0){
				resp.errors = undefined;

				var salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);

        var tUser = new User(data);
				tUser.place();

				req.session.username = data.username;
				req.session.fname    = data.fname;
				req.session.lname    = data.lname;
				req.session.email    = data.email;

				req.session.regenerate(function(err){});

		    resp.success = "Successful";
				res.json(resp);
				res.end();
			}else{
				resp.code = 400;
				res.json(resp);
				res.end();
			}
		});
	});
};

exports.deleteUser = function(username, req, res){
	// Validate input
};

exports.getDemand = function(id, res){
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

exports.createDemand = function(data, req, res){
	var resp = {};
	resp.errors = [];

	// Validate input
	if(data.delieverer !== null && !global.usernameRegex.test(data.deliverer)){
		resp.errors.push({
    	errorType: "delieverer",
    	text:      "Invalid characters in the delieverer"
  	});
	}

	if(!global.individNameRegex.test(data.fname)){
  	resp.errors.push({
    	errorType: "fname",
    	text:      "Invalid characters in the first name"
  	});
	}

	if(!global.commentRegex.test(data.comments)){
  	resp.errors.push({
    	errorType: "comments",
    	text:      "Invalid characters in the comments"
  	});
	}

	if(!global.latLngRegex.test(data.destination.lat) || !global.latLngRegex.test(data.destination.lng)){
  	resp.errors.push({
    	errorType: "latLng",
    	text:      "Invalid characters in the latitude or longitude"
  	});
	}

	if(!global.itemRegex.test(data.item)){
  	resp.errors.push({
    	errorType: "item",
   		text:      "Invalid characters in the item name"
  	});
	}

	if(!global.priceRegex.test(data.price)){
  	resp.errors.push({
    	errorType: "price",
    	text:      "Invalid characters in the price"
  	});
	}

	if(data.shop !== null && !global.shopRegex.test(data.shop)){
  	resp.errors.push({
    	errorType: "shop",
    	text:      "Invalid characters in the shop name"
  	});
	}

	if(!global.tipRegex.test(data.tip)){
  	resp.errors.push({
    	errorType: "tip",
    	text:      "Invalid characters in the tip"
  	});
	}

	if(resp.errors.length === 0){
		resp.errors = undefined;
		data.asker  = data.fname;
		data.destination.long = data.destination.lng;
		data.owner  = req.session.username;

		var tDemand = new Demand(data);
		tDemand.place();
  	resp.success = "Successful";
  	res.json(resp);
  	res.end();
	}else{
		resp.code = 400;
		res.json(resp);
		res.end();
	}
};

exports.updateDemand = function(data, req, res){
	// Validate input
	var resp = {};
	resp.errors = [];

	// Validate input
	if(data.deliverer !== null && !global.usernameRegex.test(data.deliverer)){
		resp.errors.push({
    	errorType: "deliverer",
    	text:      "Invalid characters in the delieverer"
  	});
	}

	if(!global.individNameRegex.test(data.fname)){
  	resp.errors.push({
    	errorType: "fname",
    	text:      "Invalid characters in the first name"
  	});
	}

	if(!global.commentRegex.test(data.comments)){
  	resp.errors.push({
    	errorType: "comments",
    	text:      "Invalid characters in the comments"
  	});
	}

	if(!global.latLngRegex.test(data.destination.lat) || !global.latLngRegex.test(data.destination.lng)){
  	resp.errors.push({
    	errorType: "latLng",
    	text:      "Invalid characters in the latitude or longitude"
  	});
	}

	if(!global.itemRegex.test(data.item)){
  	resp.errors.push({
    	errorType: "item",
   		text:      "Invalid characters in the item name"
  	});
	}

	if(!global.priceRegex.test(data.price)){
  	resp.errors.push({
    	errorType: "price",
    	text:      "Invalid characters in the price"
  	});
	}

	if(data.shop !== null && !global.shopRegex.test(data.shop)){
  	resp.errors.push({
    	errorType: "shop",
    	text:      "Invalid characters in the shop name"
  	});
	}

	if(!global.tipRegex.test(data.tip)){
  	resp.errors.push({
    	errorType: "tip",
    	text:      "Invalid characters in the tip"
  	});
	}

	if(resp.errors.length === 0){
		Demand.findById(data.id, function(result){
			if(result === null){
				resp.errors.push({
        	errorType: "id",
        	text:      "Demand does not exist"
      	});
      	resp.code = 400;
				res.json(resp);
				res.end();
			}else{
				if(result.owner !== req.session.username){
					if(result.deliverer === null && data.deliverer !== null){
						result.deliverer = data.deliverer;

						var tDemand = new Demand(result);
						tDemand.placeWithID(data.id);
			    	resp.success = "Successful";
			    	res.json(resp);
			    	res.end();
					}else{
						resp.errors.push({
		        	errorType: "conflict",
		        	text:      "You do not own the demand"
		      	});
		      	resp.code = 400;
						res.json(resp);
						res.end();
					}
				}else{
					resp.errors = undefined;
					data.asker  = data.fname;
					data.destination.long = data.destination.lng;

					var tDemand = new Demand(data);
					tDemand.placeWithID(data.id);
		    	resp.success = "Successful";
		    	res.json(resp);
		    	res.end();
				}
			}
		});
	}else{
		resp.code = 400;
		res.json(resp);
		res.end();
	}
};

exports.deleteDemand = function(id, req, res){
	// Validate input
	Demand.findById(id, function(result){
		if(result !== null && req.session.username == result.owner){
			var tDemand = new Demand(result);
			tDemand.deleteWithID(id);
			resp.success = "Successful";
			res.json(resp);
			res.end();
		}else{
			resp.errors.push({
				errorType: "conflict",
				text:      "You do not own the demand or it does not exist"
			});
			resp.code = 400;
			res.json(resp);
			res.end();
		}
	});
}
