var mongoose = require('mongoose');



var ResumeSchema = new mongoose.Schema({
	name: String,
    title: String,
    profileUrl: String,
    intro: String,
    contact: [String],
    toolbox: [String],
    experience:[String],
    education: [String]
    
});
// var things = ResumeSchema.index({field1: String, field2: String});


module.exports = mongoose.model('Resume', ResumeSchema); 