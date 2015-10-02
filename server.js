// BASE SETUP

// CALL THE PACKAGES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var Event = require('./app/models/event');
var port = process.env.PORT || 8080;

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
mongoose.connect('mongodb://localhost:27017/kldb');

// ROUTES FOR OUT API

// basic route for the home page testing
app.get('/', function(req, res){
	res.send("Welcome to the home page");
});

// get an instance of the express routes
var apiRouter = express.Router();

// midddleware to use for all request
apiRouter.use(function(req, res, next){
	console.log("Somebody just came to our app!!");
	next();
});
////////////////////USERS ROUTES/////////////////////////
// on routes that en in /users
apiRouter.route('/users')
	// create a user (accesed at POST http:localhost:8080/api/users)
	.post(function(req, res){
		// create a new instance of the User model
		var user = new User();
		// set the users information (comes from the request)
		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;
		//save the user and check for errors
		user.save(function(err){
			if(err){
				// duplicate entry
				if(err.code == 11000)
					return res.json({success: false, message: "A user with that username already exists"});
				else
					return res.send(err);
			}
			res.json({message:"User created!"});
		});
	})

	// get all users (accessed at GET http:localhost:8080/api/users)
	.get(function(req, res){
		User.find(function(err, users){
			// return users
			res.json(users);
		});
	});

	// on routes that end in /users/:user_id
apiRouter.route('/users/:user_id')
	// get the user with that id
	// (accessed at GET http:localhost:8080/api/users/:user_id)

	.get(function(req, res){
		User.findById(req.params.user_id, function(err, user){
			if(err) res.send(err);
			// return that user
			res.json(user);
		});
	})
	// update the user with this id
	// accessed at PUT http:localhost:8080/users/:user_id
	.put(function(req, res){
		User.findById(req.params.user_id, function(err, user){
			if(err) res.send(err);

			// update the user
			if(req.body.name) user.name = req.body.name;
			if(req.body.username) user.username = req.body.username;
			if(req.body.password) user.password = req.body.password;

			// save the user
			user.save(function(err){
				if(err) res.send(err);

				// return a message
				res.json({message: "User has been updated!"});
			});

		});
	})
	// delete the user with this id
	// accesed at DELETE http:localhost:8080/api/users/:user_id
	.delete(function(req, res){
		User.remove({_id: req.params.user_id}, function(err, user){
			if(err) return res.send(err);
			res.json({message: "Succesfully deleted"})
		});
	});
	////////////////////ENDS USERS ROUTES/////////////////////////

////////////////////EVENTS ROUTES/////////////////////////
// on routes that end in /events
apiRouter.route('/events')
// create an event (access at POST http:localhost/api/evetns)
	.post(function(req, res){
		// create a new instance of the Event model
		var event = new Event();
		// set event information (comes from request)
		event.name = req.body.name;
		event.address = req.body.address;
		event.month = req.body.month;
		event.day = req.body.day;
		event.year = req.body.year;

		// save the event and check for errors
		event.save(function(err){
			if(err){
				return res.send(err);
			}
			res.json({message: "Event has been created!"})
		});
	})
	// get all events (accessed at GET http:localhost:8080/api/events)
	.get(function(req, res){
		Event.find(function(err, events){
			// returns events
			res.json(events);
		});
	})

	
// on routes ending in /events/:event_id
// accesed at GET http://localhost:8080/api/events/:event_id 
apiRouter.route('/events/:event_id')
	.get(function(req, res){
		Event.findById(req.params.event_id, function(err, event){
			if(err) res.send(err);
			res.json(event);

		});
	})

	// update event
	.put(function(req, res){
		Event.findById(req.params.event_id, function(err, event){
			if(err) res.send(err);

			// update the user
			if(req.body.name) event.name = req.body.name;
			if(req.body.address) event.address = req.body.address;
			if(req.body.month) event.month = req.body.month;
			if(req.body.day) event.day = req.body.day;
			if(req.body.year) event.year = req.body.year;

			// save the event
			event.save(function(err){
				if(err) res.send(err);

				// return a message
				res.json({message: "Event has been updated!"});
			});

		});
	})

	// delete event with this id
	.delete(function(req, res){
		Event.remove({_id: req.params.event_id}, function(err, event){
			if(err) return res.send(err);
			res.json({message: "Succesfully deleted"});
		});
	})
//////////////////// ENDS EVENTS ROUTES/////////////////////////
// test route to make sure everything is working
apiRouter.get('/', function(req, res){
	res.json({message: "hooray, welcome to our api"});
});

// REGISTER OUR ROUTES
app.use('/api', apiRouter);

//START SERVER
app.listen(port);
console.log("Magiv happens on port" + port);
