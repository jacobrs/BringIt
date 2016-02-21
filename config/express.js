var express    = require('express');
var exhbs      = require('express-handlebars');
var bodyParser = require('body-parser');

var serverLogging = function(req, res, next){
	console.log(req.method, req.url);
	next();
}; 

module.exports = function(){
	var app    = express();
	var router = express.Router();

	// Setting app defaults
	app.engine('.hbs',  exhbs({
        	extname: '.hbs',
        	layoutDirs: appRoot+'/app/views/'
	}));
	app.set('view engine', '.hbs');
	app.set('views', appRoot+'/app/views/');

	// Initializing some middleware
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(serverLogging);

	require(appRoot+"/app/routes/index.routes.js")(router);
	require(appRoot+"/app/routes/main.routes.js")(router);
	require(appRoot+"/app/routes/user.routes.js")(router);

	app.use(router);

	return app;	
};
