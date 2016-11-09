// set up ======================================================================
var express = require('express');
var http = require('http');
var app      = express(); 								// create our app w/ express
var port = process.env.PORT || 8080; 				// set the port
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)


app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/src', express.static(__dirname + '/src'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/public', express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({ 'extended': 'true' })); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// routes ======================================================================
require('./routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
