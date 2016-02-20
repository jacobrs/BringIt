var path = require('path');
global.appRoot = path.resolve(__dirname);

var express = require('express');
var exhbs = require('express-handlebars');

var app = express();
var config = require(appRoot+"/config/server_config");

app.engine('.hbs',  exhbs({
	extname: '.hbs',
	layoutDirs: appRoot+'/app/views/'
}));
app.set('view engine', '.hbs');
app.set('views', appRoot+'/app/views/');

require(appRoot+"/routes")(app);

app.listen(config.port);
