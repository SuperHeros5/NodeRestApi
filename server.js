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
//console.log(Bear.toadi);
// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
router.route('/toadibatla')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {
		var fbdata=[];
		var fbdata1=[];
		// console.log(req.body);
	if(req.body.result.resolvedQuery === "GETTING_STARTED_BUS"){
		fbdata=[{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Which busroute details do you want to know?",
        "buttons":[
          {
            "type":"postback",
            "title":"From Adibatla",
            "payload":"FROMADIBATLA"
          },
          {
            "type":"postback",
            "title":"To Office",
            "payload":"TOADIBATLA"
          },
	   {
              "type": "web_url",
              "url": "www.adibatlatransportation.com",
              "title": "visit the site"
            }
        ]
      }
      }
    }];
		
			res.json({
"speech": "Buses to Adibatla",
"displayText": "Buses to Adibatla",
"data": {"facebook": [{"sender_action":"MARK_SEEN"},{"sender_action":"TYPING_ON"},fbdata,{"sender_action":"TYPING_OFF"}]},
"contextOut": [],
"source": "MongoDb"
});
	}else if(req.body.result.parameters.fromstop){
		
	Bear.toadi.find({ "place" :  new RegExp('^'+req.body.result.parameters.fromstop, "i")}, function(err, bear) {
			if (err)
				res.send(err);
			if(bear.length > 0){
			  
			if(bear.length>1){
				var buttonarray=[];
				for(var i=0;i<bear.length;i++){
				if(i === 3){break;}
				buttonarray.push({
				 "type":"postback",
				    "title": bear[i].place,
				    "payload":"TOADIBATLA "+bear[i].place
				});
				}
			fbdata.push({
			    "attachment":{
			      "type":"template",
			      "payload":{
				"template_type":"button",
				"text":"Did you mean?",
				"buttons":buttonarray
			      }
			      }
			    });

			}else{
			fbdata.push({"text":bear[0].place+" to Adibatla"});
			fbdata.push({"text":"Landmark: "+bear[0].landmark});
			fbdata.push({"text":"Timings  BusNumbers"});
		
		bear[0].timings.forEach((timing)=>{
		
		fbdata.push({"text":timing.time+" "+getRoute(timing.routes)});
		
		});
			}
		}else{
		fbdata=[{
  	"text":"Please check the spelling or the above route is not covered"
    }];	
		}
		
		res.json({
"speech": "Buses to Adibatla",
"displayText": "Buses to Adibatla",
"data": {"facebook": [{"sender_action":"MARK_SEEN"},{"sender_action":"TYPING_ON"},fbdata,{"sender_action":"TYPING_OFF"}]},
"contextOut": [],
"source": "MongoDb"
});
		});
	
	}else if(req.body.result.parameters.tostop){
		
		Bear.fromadi.find({ "place" :  new RegExp('^'+req.body.result.parameters.tostop, "i")}, function(err, bear) {
			if (err)
				res.send(err);
				if(bear.length > 0){
			  
			if(bear.length>1){
				var buttonarray=[];
				for(var i=0;i<bear.length;i++){
				if(i === 3){break;}
				buttonarray.push({
				 "type":"postback",
				    "title": bear[i].place,
				    "payload":"FROMADIBATLA "+bear[i].place
				});
				}
			fbdata.push({
			    "attachment":{
			      "type":"template",
			      "payload":{
				"template_type":"button",
				"text":"Did you mean?",
				"buttons":buttonarray
			      }
			      }
			    });

			}else{
			fbdata.push({"text":"Adibatla to "+bear[0].place});
			fbdata.push({"text":"Landmark: "+bear[0].landmark});
			fbdata.push({"text":"Timings  BusNumbers"});
		
		bear[0].timings.forEach((timing)=>{
		
		fbdata.push({"text":timing.time+" "+getRoute(timing.routes)});
		
		});
			}
				}else{
			fbdata=[{
  	"text":"Please check the spelling or the above route is not covered"
    }];		
			}
			res.json({
"speech": "Buses to Adibatla",
"displayText": "Buses to Adibatla",
"data": {"facebook": [{"sender_action":"MARK_SEEN"},{"sender_action":"TYPING_ON"},fbdata,{"sender_action":"TYPING_OFF"}]},
"contextOut": [],
"source": "MongoDb"
});
		});
	
	}
	
	else{
		
  /* var fbdata = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    };
    console.log(req.body);*/
    	Bear.toadi.find(function(err, bears) {
    	  
		var elements = bears;
		var list=[];
			if (err)
				res.send(err);
		//console.log(elements);
	for (var i in bears) {
  console.log(bears[i]);
  
  var oneelemnt ={
    bear : bears[i],
    title: "place "+(bears[i].place),
            subtitle: (bears[i].landmark),              
             item_url: "https://www.oculus.com/en-us/rift/", 
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              title: "From Adibatla",
              url: "http://messengerdemo.parseapp.com/img/touch.png",
              webview_height_ratio: "tall",
	            payload: "fromadibatla"    
            }, {
              type: "postback",
              title: "To Adibatla",
              payload: "toadibatla"
            }]
          };
          
          if(list.length < 6){
	list.push(oneelemnt);
          }
}
		list.push({
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }
		);
		console.log(list);
		var fbdata = [{
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: list
        }
      }
    }];
		res.json({
"speech": "Buses to Adibatla",
"displayText": "Buses to Adibatla",
"data": {bears,"facebook": [{"sender_action":"MARK_SEEN"},{"sender_action":"TYPING_ON"},req.body.result,{"sender_action":"TYPING_OFF"}]},
"contextOut": [],
"source": "MongoDb"
});
		//	res.json(bears);
		}).limit(100);
	}
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
	 // console.log(Bear.toadi);
	 // res.send(	Bear.toadi);
	 // res.send("err");
	 	var buses=[];
	 	Bear.toadi.find({},'place',function(err, bears) {
		  //res.send("err"); 
			if (err)
				res.send(err);

		//	res.json(bears);
		
			for(var i in bears ){
			  buses.push(bears[i].place)
			}
			console.log(buses);
			//res.json(buses);
		}).limit(100);
		Bear.toadi.find({},'place',function(err, bears) {
		  //res.send("err"); 
			if (err)
				res.send(err);

			//res.json(bears);
			
			for(var i in bears ){
			  buses.push(bears[i].place)
			}
			console.log(buses);
			res.json(buses.sort());
		}).skip(100).limit(100);
	});

function getRoute(routes){
	var routeappend="";
	routes.forEach((route,index)=>{
	routeappend=routeappend+route;
		if(index != (routes.length-1)){
			routeappend=routeappend+",";
		}
	});
	return routeappend;
}

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/toadibatla/:bear_id')

	// get the bear with that id
	.get(function(req, res) {
	  //res.send(req.params.bear_id);
		Bear.toadi.findOne({ "place" : req.params.bear_id}, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Bear.toadi.findById(req.params.bear_id, function(err, bear) {

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
		Bear.toadi.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

router.route('/fromadibatla/:bear_id')
	.get(function(req, res) {
	  //res.send(req.params.bear_id);
	 
		Bear.fromadi.findOne({ "place" : req.params.bear_id}, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
