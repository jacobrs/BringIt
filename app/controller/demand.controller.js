var funcs = require(appRoot+"/config/global_functions.js");

exports.getDemand = function(req, res, next){
	var resp = {};

	if(!funcs.isUndef(req.params.id)){
		funcs.getDemand(req.params.id, res);
	}else{
		resp.error = "Invalid use of api";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};

exports.postDemand = function(req, res, next){
	var body = req.body;
	var resp = {};

	if(!funcs.isUndef(body.fname) && !funcs.isUndef(body.item) && !funcs.isUndef(body.price) &&
	   !funcs.isUndef(body.destination) && !funcs.isUndef(body.shop) && !funcs.isUndef(body.tip)){
					console.log(body);
		funcs.createDemand(body, res);
	}else{
		resp.error = "Invalid use of api";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};

exports.putDemand = function(req, res, next){
        var body = req.body;
        var resp = {};

        if(!funcs.isUndef(body.id) && !funcs.isUndef(body.fname) && !funcs.isUndef(body.item) && !funcs.isUndef(body.price) &&
           !funcs.isUndef(body.destination) && !funcs.isUndef(body.deliverer) && !funcs.isUndef(body.tip)){
								funcs.updateDemand(body, res);
        }else{
                resp.error = "Invalid use of api";
                resp.code  = 400;
                res.json(resp);
                res.end();
        }

};

exports.deleteDemand = function(req, res, next){
	var resp = {};

	if(!funcs.isUndef(req.params.id)){
		funcs.deleteDemand(req.params.id, res);
	}else{
		resp.error = "Invalid use of api";
		resp.code  = 400;
		res.json(resp);
		res.end();
	}
};
