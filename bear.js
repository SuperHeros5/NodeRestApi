var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
	place: String,
	landmark: String,
	lattitude: String,
	longitude: String,
	timings: Array
});
var BearSchema1   = new Schema({
	place: String,
	landmark: String,
	lattitude: String,
	longitude: String,
	timings: Array
});
var toadibatla = mongoose.model('ToAdibatla', BearSchema,'ToAdibatla');
var fromadibatla = mongoose.model('FromAdibatla', BearSchema1,'FromAdibatla');
module.exports = { toadi : toadibatla , fromadi : fromadibatla};
