var demandController = require(appRoot+"/app/controller/demand.controller.js");

module.exports = function(app){
	app.get("/demand/:id", demandController.getDemand); 
	app.post("/demand", demandController.postDemand);
	app.put("/demand", demandController.putDemand);
	app.delete("/demand/:id", demandController.deleteDemand);
};
