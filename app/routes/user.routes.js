var userController = require(appRoot+"/app/controller/user.controller.js");

module.exports = function(app){
	app.get("/user/:username", userController.getUser);
	app.post("/user/:username", userController.postUser);
	app.put("/user/:username", userController.putUser);
	app.delete("/user/:username", userController.deleteUser);
};
