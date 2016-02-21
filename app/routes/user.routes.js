var userController = require(appRoot+"/app/controller/user.controller.js");

module.exports = function(app){
	app.get("/user/:username", userController.getUser);
	app.post("/user", userController.postUser);
	app.put("/user", userController.putUser);
	app.delete("/user/:username", userController.deleteUser);
	app.post("/user/login", userController.login);
	app.post("/user/logout", userController.logout);
};
