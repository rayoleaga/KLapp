// grab the packages that we need for the calendar model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require ('bcrypt-nodejs');

// calendar Schema
var eventSchema = new Schema({
	name: String,
	address: String,
	month: String,
	day: Number,
	year: Number
});

// return model
module.exports = mongoose.model('Events', eventSchema);
