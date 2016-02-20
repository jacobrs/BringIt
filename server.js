var path = require('path');
var express = require('express');

var app = express();
global.appRoot = path.resolve(__dirname);;

var config = require(appRoot+"/config/server_config");

require(appRoot+"/routes")(app);

app.listen(config.port);
