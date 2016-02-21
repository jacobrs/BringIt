var mainController = require(appRoot+"/app/controller/main.controller.js");

module.exports = function(app){
	app.get("/main", mainController.showMain);
};
