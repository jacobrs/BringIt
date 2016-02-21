var User   = require(appRoot+"/app/models/user.model.js");
var Demand = require(appRoot+"/app/models/demand.model.js");
var bcrypt = require("bcrypt");

exports.isUndef = function(item){
	return item === undefined || item === null;
};

exports.getUser = function(username, res){
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

// Helper function that deals with a response and determines
// if the user should be created (and creates it) or not
exports.createUser = function(data, res){
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
			resp.errors.push({
                        	errorType: "username",
                        	text:      "Username is already taken"
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

exports.updateUser = function(data, res){
	// Validate input
};

exports.deleteUser = function(username, res){
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

exports.createDemand = function(data, res){
	var resp = {};	
	resp.errors = [];

	// Validate input
	if(!global.usernameRegex.test(data.deliverer)){
		resp.errors.push({
			errorType: "deliverer",
			text:	   "Invalid characters in deliverer's username"
		});
	}	

	User.findByUsername(data.deliverer, function(result){
		if(result === null){
			resp.errors.push({
                        	errorType: "deliverer",
                        	text:      "Deliverer username does not match existing username"
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

        	if(!global.shopRegex.test(data.shop)){
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
	});
};

exports.updateDemand = function(data, res){
	// Validate input
};

exports.deleteDemand = function(id, res){
	// Validate input
}
