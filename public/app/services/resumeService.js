angular.module('resumeService', [])
	
	.factory('Resume', function($http){

		var resumeFactory = {};

		resumeFactory.info = function(){
			return $http.get('/my/resume');
		}




		return resumeFactory;
	});