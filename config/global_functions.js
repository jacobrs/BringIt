var User   = require(appRoot+"/app/models/user.model.js");
var Demand = require(appRoot+"/app/models/demand.model.js");

exports.isUndef = function(item){
	return item === undefined || item === null;
};

exports.getUser = function(username, req, res, next){
	console.log("Hoho 1");
};

exports.createUser = function(data, req, res, next){
        console.log("Hoho 2");
};

exports.updateUser = function(data, req, res, next){
        console.log("Hoho 3");
};

exports.deleteUser = function(username, req, res, next){
        console.log("Hoho 4");
};

exports.getDemand = function(id, req, res, next){
        console.log("Hoho 5");
};

exports.createDemand = function(data, req, res, next){
        console.log("Hoho 6");
};

exports.updateDemand = function(data, req, res, next){
        console.log("Hoho 7");
};

exports.deleteUser = function(id, req, res, next){
        console.log("Hoho 8");
}
