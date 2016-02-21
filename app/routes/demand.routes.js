var demandController = require(appRoot+"/app/controller/demand.controller.js");

module.exports = function(app){
	app.get("/demand/:id", demandController.getDemand); 
	app.post("/demand, demandController.createDemand);
	app.put("/demand, demandController.updateDemand);
	app.delete("/demand/:id", demandController.deleteDemand);
};
