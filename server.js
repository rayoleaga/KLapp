// BASE SETUP
// CALL THE PACKAGES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');
var Resume = require('./app/models/resume');


// APP CONFIGURATION
// user body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// configure app to handle CORS request
app.use(function(req, res, next){
	res.setHeader('Access-Control-Origin', '*');
	res.setHeader('Access-Control-Methods', 'GET, POST');
	res.setHeader('Access-Control-Header', 'X-Requestd-With,content-type, Authorization');
	next();
});

//  log all requests to the console
app.use(morgan('dev'));

// connect to our database
mongoose.connect(config.database);
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUT API
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);


var resumeRoutes = require('./app/routes/resume')(app, express);
app.use('/my', resumeRoutes);


app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//START SERVER
app.listen(config.port);
console.log("Magic happens on port" + config.port);
