var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
global.jQuery = global.$ = require('jquery');
var gcloud = require('gcloud');
//var bootstrap = require("bootstrap");

module.exports = function(){
var app = express();
	app.set('view engine','ejs');
	app.set('views','./app/views');
	app.set('uploads','./app/uploads');

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(expressValidator());
	app.use(express.static('/uploads'));
//	app.use(bootstrap.serve);


	load('routes',{cwd:'app'})
		.then('infra')
		.into(app);
	
	return app;
}