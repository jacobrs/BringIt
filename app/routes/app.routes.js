var mainController = require(appRoot+"/app/controller/app.controller.js");

module.exports = function(app){
	app.get("/app", mainController.showApp);
};
