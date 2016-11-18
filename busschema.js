var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BusSchema1   = new Schema({
	place: String,
	landmark: String,
	lattitude: String,
	longitude: String,
	timings: Array
});
var BusSchema2   = new Schema({
	place: String,
	landmark: String,
	lattitude: String,
	longitude: String,
	timings: Array
});
var toadibatla = mongoose.model('ToAdibatla', BusSchema1,'ToAdibatla');
var fromadibatla = mongoose.model('FromAdibatla', BusSchema2,'FromAdibatla');
module.exports = { toadi : toadibatla , fromadi : fromadibatla};
