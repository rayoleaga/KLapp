var Resume = require('../models/resume');
var config = require('../../config');




module.exports = function(app, express){
	var resumeRouter = express.Router();
		// Resume route
		resumeRouter.route('/resume')



			.post(function(req, res){
				var resume = new Resume();
				

				resume.name = req.body.name;
				resume.title = req.body.title;
				resume.profileUrl = req.body.profileUrl;
				resume.intro = req.body.intro
				resume.contact = req.body.contact;
				resume.toolbox = req.body.toolbox;
				resume.experience = req.body.experience;
				resume.education = req.body.education;
				resume.things = req.body.things;




				resume.save(function(err){
					
					res.json({message: "Resume has been added"});


				});


			})

			.get(function(req, res){
				Resume.find(function(err, resume){
					if(err)
						res.send(err);

						res.json(resume);
				});
			});


			resumeRouter.route('/resume/:resume_id')


			.get(function(req, res){
				Resume.findById(req.params.resume_id, function(err, resume){
					if(err)
						res.send(err);

						res.json(resume);
				});
			})

			.delete(function(req, res){
				Resume.remove({_id: req.params.resume_id}, function(err, resume){
					if(err)
						res.send(err);

					res.json({message: "Resume Succesfully deleted"})
				});
			})

			.put(function(req, res){
				Resume.findById(req.params.resume_id, function(err, resume){
					if(err)
						res.send(err);
					if(req.body.name) resume.name = req.body.name;
					if(req.body.title) resume.title = req.body.title;
					if(req.body.intro) resume.intro = req.body.intro;
					if(req.body.profileUrl) resume.profileUrl = req.body.profileUrl;
					if(req.body.contact) resume.contact.push(req.body.contact);
					if(req.body.education) resume.education.push(req.body.education);
					if(req.body.toolbox) resume.toolbox.push(req.body.toolbox) ;
					if(req.body.experience) resume.experience.push(req.body.experience);


					resume.save(function(err){
						if(err)
							res.send(err);

						res.json({message: "Resume has been Succesfully updated..."});
					});

				});
			});
			return resumeRouter;
}