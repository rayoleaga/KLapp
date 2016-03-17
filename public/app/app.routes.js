angular.module('app.routes', ['ngRoute'])
	
	.config(function($routeProvider, $locationProvider){

		$routeProvider

		// home page route
		.when('/', {
			templateUrl: 'app/views/pages/home.html',
			controller: 'eventController',
			controllerAs: 'event'
		})

		.when('/admin',{
			templateUrl: 'app/views/pages/admin.html',
			controller: 'mainController',
			controllerAs: 'admin'
		})

		.when('/events',{
			templateUrl:'app/views/pages/home.html',
			controller: 'eventController',
			controllerAs: 'event'
		})

		.when('/resume',{
			templateUrl: 'app/views/pages/resume.html',
			controller: 'resumeController',
			controllerAs: 'resume'
		})

		.when('/videos',{
			templateUrl: 'app/views/pages/videos.html',
			controller: 'videoController',
			controllerAs: 'video'


		})

			.when('/photos',{
			templateUrl: 'app/views/pages/photos.html',
			controller: 'photoController',
			controllerAs: 'photo'


		})

				// show all users
		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'

		})
		// create
		.when('/users/create', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})
		// update
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})



		

		// get rid of the hash in the URL
		$locationProvider.html5Mode(true);
	});