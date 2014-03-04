// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var fs = require('fs');									/// Include the node file module
var port  	 = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config

// configuration ===============================================================
mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride());
	app.get('/galerie',function (req, res) {
	    res.sendfile(__dirname + '/public/show.html');
	});
	app.get('/Timeline',function (req, res) {
	    res.sendfile(__dirname + '/public/VerticalTimeline/index.html');
	});
	app.get('/listing',function (req, res) {
	    res.sendfile(__dirname + '/public/ViewModeSwitch/index.html');
	});
	app.get('/calendar',function (req, res) {
	    res.sendfile(__dirname + '/public/calendar/demos/agenda-views.html');
	});
});





// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
