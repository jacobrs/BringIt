var funcs = require(appRoot+"/config/global_functions.js");

exports.getDemand = function(req, res, next){
	var body = req.body;
	var resp = {};

	if(!funcs.isUndef(body.id)){
		funcs.getDemand(body.id, req, res, next);
	}else{
		resp.error = "Invalid use of api";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};

exports.createDemand = function(req, res, next){
	var body = req.body;
	var resp = {};

	if(!funcs.isUndef(body.fname) && !funcs.isUndef(body.item) && !funcs.isUndef(body.price) && 
	   !funcs.isUndef(body.destination) && !funcs.isUndef(body.deliverer) && !funcs.isUndef(body.tip)){
		funcs.createDemand(body, req, res, next);
	}else{
		resp.error = "Invalid use of api";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};

exports.updateDemand = function(req, res, next){
        var body = req.body;
        var resp = {};

        if(!funcs.isUndef(body.fname) && !funcs.isUndef(body.item) && !funcs.isUndef(body.price) &&
           !funcs.isUndef(body.destination) && !funcs.isUndef(body.deliverer) && !funcs.isUndef(body.tip)){
                funcs.updateDemand(body, req, res, next);
        }else{
                resp.error = "Invalid use of api";
                resp.code  = 400;
                res.json(resp);
                res.end();
        }

};

exports.deleteDemand = function(req, res, next){
	var body = req.body;
	var resp = {};

	if(!funcs.isUndef(body.id)){
		funcs.deleteDemand(body.id, req, res, next);
	}else{
		resp.error = "Invalid use of api";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};
