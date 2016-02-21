var path       = require('path');
global.appRoot = path.resolve(__dirname);

var config   = require(appRoot+"/config/server_config");
var express  = require(appRoot+'/config/express');
var Firebase = require("firebase");

var app    = express();
global.rootRef = new Firebase(config.firebase_url);

app.listen(config.port);
