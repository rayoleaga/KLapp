var bodyParser = require('body-parser'); 	// get body-parser
var User = require('../models/user');
var Event = require('../models/event');
var jwt = require('jsonwebtoken');
var config = require('../../config');


// super secret for creating tokens
var superSecret = config.secret;
module.exports = function(app, express){

	// get an instance of the express routes
var apiRouter = express.Router();

// route for authenticating users
apiRouter.post('/authenticate', function(req, res){
	// find user
	// select the name username and password explicitly
	User.findOne({
		username: req.body.username
	}).select('name username password').exec(function(err, user){
		if(err) throw err;

		// no user with that username was found
		if(!user){
			res.json({
				success: false,
				message: "Authentication failed. User not found."
			});
		} else if(user){

			// check if password mathchs
			var validPassword = user.comparePassword(req.body.password);
			if(!validPassword){
				res.json({
					success: false,
					message: "Authentication failed. Wrong password"
				});
			} else {
			// if user is found and password is right
			// create a token
			var token = jwt.sign({
				name: user.name,
				username: user.username

			}, superSecret,{
				expiresInMinutes: 1440 // expires in 24 hours
			});
			res.json({
				success: true,
				message: "Enjoy your token!",
				token: token
			});
		}
		}
	
	});
});
// show all events PUBLIC API
apiRouter.route('/all-events')
		// get all events (accessed at GET http:localhost:8080/api/events)
	.get(function(req, res){
		Event.find(function(err, events){
			// returns events
			res.json(events);
		});
	});


// midddleware to use for all request
apiRouter.use(function(req, res, next){
	// check header our url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	// decode token
	if(token){
		// verifies secret and checks exp
		jwt.verify(token, superSecret, function(err, decoded){
			if(err){
				return res.status(403).send({
					success: false,
					message: "Failed to authenticate token."
				});
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		// if there is no token
		// return an HTTP response of 403 (access forbidden) and error message
		return res.status(403).send({
			success: false,
			message: "No token provided."
		});
	}
	console.log("Somebody just came to our app!!");
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

	apiRouter.get('/me', function(req, res){
	res.send(req.decoded);
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
	});
	return apiRouter;
}