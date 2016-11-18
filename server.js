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

var port     =  process.env.PORT || 8080; // set our port
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
var Bus     = require('./busschema');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	res.header("Access-Control-Allow-Origin", "*");
 	 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	console.log('Request received');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  console.log(mongoose.connection.readyState);
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /toadibatla
// ----------------------------------------------------
router.route('/toadibatla')

	//  (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {
		var fbdata=[];
		var fbdata1=[];
		var context=[];
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
		
	Bus.toadi.find({ "place" :  new RegExp('^'+req.body.result.parameters.fromstop, "i")}, function(err, buses) {
			if (err)
				res.send(err);
			if(buses.length > 0){
			  
			if(buses.length>1){
				var buttonarray=[];
				for(var i=0;i<buses.length;i++){
				if(i === 3){break;}
				if(buses[i].place === req.body.result.parameters.fromstop){
					fbdata.push({"text":buses[i].place+" to Adibatla"});
					fbdata.push({"text":"Landmark: "+buses[i].landmark});
					fbdata.push({"text":"Timings  BusNumbers"});
		
					buses[i].timings.forEach((timing)=>{
		
					fbdata.push({"text":timing.time+" "+getRoute(timing.routes)});
					});
				   break;
				   }
				buttonarray.push({
				 "type":"postback",
				    "title": buses[i].place,
				    "payload":"TOADIBATLA "+buses[i].place
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
			fbdata.push({"text":buses[0].place+" to Adibatla"});
			fbdata.push({"text":"Landmark: "+buses[0].landmark});
			fbdata.push({"text":"Timings  BusNumbers"});
		
		buses[0].timings.forEach((timing)=>{
		
		fbdata.push({"text":timing.time+" "+getRoute(timing.routes)});
		
		});
			}
		}else{
		fbdata=[{
  	"text":"Please check the spelling of "+req.body.result.parameters.fromstop+" or enter any other location nearby"
    }];	
		context =  [{"name":"correctfrombusstop", "lifespan":1, "parameters":{"fromstop":req.body.result.parameters.fromstop}}];
		}
		
		res.json({
"speech": "Buses to Adibatla",
"displayText": "Buses to Adibatla",
"data": {"facebook": [{"sender_action":"MARK_SEEN"},{"sender_action":"TYPING_ON"},fbdata,{"sender_action":"TYPING_OFF"}]},
"contextOut": context,
"source": "MongoDb"
});
		});
	
	}else if(req.body.result.parameters.tostop){
		
		Bus.fromadi.find({ "place" :  new RegExp('^'+req.body.result.parameters.tostop, "i")}, function(err, buses) {
			if (err)
				res.send(err);
				if(buses.length > 0){
			  
			if(buses.length>1){
				var buttonarray=[];
				for(var i=0;i<buses.length;i++){
				if(i === 3){break;}
					if(buses[i].place === req.body.result.parameters.tostop){
					fbdata.push({"text":"Adibatla to "+buses[i].place});
					fbdata.push({"text":"Landmark: "+buses[i].landmark});
					fbdata.push({"text":"Timings  BusNumbers"});
		
					buses[i].timings.forEach((timing)=>{
		
					fbdata.push({"text":timing.time+" "+getRoute(timing.routes)});
						});
				   break;
				   }
				buttonarray.push({
				 "type":"postback",
				    "title": buses[i].place,
				    "payload":"FROMADIBATLA "+buses[i].place
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
			fbdata.push({"text":"Adibatla to "+buses[0].place});
			fbdata.push({"text":"Landmark: "+buses[0].landmark});
			fbdata.push({"text":"Timings  BusNumbers"});
		
		buses[0].timings.forEach((timing)=>{
		
		fbdata.push({"text":timing.time+" "+getRoute(timing.routes)});
		
		});
			}
				}else{
			fbdata=[{
  	"text":"Please check the spelling of "+req.body.result.parameters.tostop+" or enter any other location nearby"
    }];		
		context =  [{"name":"correcttobusstop", "lifespan":1, "parameters":{"tostop":req.body.result.parameters.tostop}}];
			}
			res.json({
"speech": "Buses to Adibatla",
"displayText": "Buses to Adibatla",
"data": {"facebook": [{"sender_action":"MARK_SEEN"},{"sender_action":"TYPING_ON"},fbdata,{"sender_action":"TYPING_OFF"}]},
"contextOut": context,
"source": "MongoDb"
});
		});
	
	}
	
	else{
    	Bus.toadi.find(function(err, buses) {
    	  
		var elements = buses;
		var list=[];
			if (err)
				res.send(err);
		//console.log(elements);
	for (var i in buses) {
  console.log(buses[i]);
  
  var oneelemnt ={
    buses : buses[i],
    title: "place "+(buses[i].place),
            subtitle: (buses[i].landmark),              
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
"data": {buses,"facebook": [{"sender_action":"MARK_SEEN"},{"sender_action":"TYPING_ON"},req.body.result,{"sender_action":"TYPING_OFF"}]},
"contextOut": [],
"source": "MongoDb"
});
		//	res.json(bears);
		}).limit(100);
	}
	
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
	 // console.log(Bear.toadi);
	 // res.send(	Bear.toadi);
	 // res.send("err");
	 	var buseslist=[];
	 	Bus.toadi.find({},'place',function(err, buses) {
		  //res.send("err"); 
			if (err)
				res.send(err);

		//	res.json(bears);
		
			for(var i in buses ){
			  buseslist.push(buses[i].place)
			}
			console.log(buseslist);
			//res.json(buses);
		}).limit(100);
		Bus.toadi.find({},'place',function(err, buses) {
		  //res.send("err"); 
			if (err)
				res.send(err);

			//res.json(bears);
			
			for(var i in buses ){
			  buseslist.push(buses[i].place)
			}
			console.log(buses);
			res.json(buseslist.sort());
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

// on routes that end in /toadibatla/:bear_id
// ----------------------------------------------------
router.route('/toadibatla/:bear_id')

	// get the bear with that id
	.get(function(req, res) {
	  //res.send(req.params.bear_id);
		Bus.toadi.findOne({ "place" : req.params.bear_id}, function(err, buses) {
			if (err)
				res.send(err);
			res.json(buses);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Bus.toadi.findById(req.params.bear_id, function(err, buses) {

			if (err)
				res.send(err);

			buses.name = req.body.name;
			buses.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Bus.toadi.remove({
			_id: req.params.bear_id
		}, function(err, buses) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

router.route('/fromadibatla/:bear_id')
	.get(function(req, res) {
	  //res.send(req.params.bear_id);
	 
		Bus.fromadi.findOne({ "place" : req.params.bear_id}, function(err, buses) {
			if (err)
				res.send(err);
			res.json(buses);
		});
	});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
