var path       = require('path');
global.appRoot = path.resolve(__dirname);

require(appRoot+"/config/globals");

var config   = require(appRoot+"/config/server_config");
var Firebase = require("firebase");
global.rootRef = new Firebase(config.firebase_url);
var express  = require(appRoot+'/config/express');

var app    = express();

app.listen(config.port);
