// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var port  	 = process.env.PORT || 8080; 				// set the port

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/src', express.static(__dirname + '/src'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/public', express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users

// routes ======================================================================
require('./routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
