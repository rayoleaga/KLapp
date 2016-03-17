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



module.exports = mongoose.model('Resume', ResumeSchema); 