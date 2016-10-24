// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port
console.log(port);
console.log(port);
var mongoose   = require('mongoose');

mongoose.connect('mongodb://siva:siva@ds015335.mlab.com:15335/busroutes'); // connect to our database
var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.  
  console.log(mongoose.connection.readyState);
});

console.log(mongoose.connection.readyState);
var Bear     = require('./bear');
console.log(port);
console.log(port);
// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  console.log(mongoose.connection.readyState);
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {
		
		 console.log(req.body);
   
    console.log(req.body);
    	Bear.find(function(err, bears) {
			if (err)
				res.send(err);
		res.json({
"speech": "Buses to Adibatla",
"displayText": JSON.stringify(req.body),
"data": {bears,"requestbody": req.body},
"contextOut": [],
"source": "MongoDb"
});
		//	res.json(bears);
		});
	/*	var bear = new Bear();		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)
console.log(req.body.name);
		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});*/
	//res.json({ message: 'Bear created!' });
		
	/*	res.json({
"speech": "Barack Hussein Obama II is the 44th and current President of the United States.",
"displayText": "Barack Hussein Obama II is the 44th and current President of the United States, and the first African American to hold the office. Born in Honolulu, Hawaii, Obama is a graduate of Columbia University   and Harvard Law School, where ",
"data": {data},
"contextOut": [],
"source": "DuckDuckGo"
});*/

	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
	  
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

	// get the bear with that id
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err);

			bear.name = req.body.name;
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
