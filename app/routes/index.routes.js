var indexController = require(appRoot+"/app/controller/index.controller.js");

module.exports = function(app){
	app.get("/", indexController.showLogin);
};
