angular.module('app.routes', ['ngRoute'])
	
	.config(function($routeProvider, $locationProvider){

		$routeProvider

		// home page route
		.when('/', {
			templateUrl: 'app/views/pages/home.html',
			controller: 'eventController',
			controllerAs: 'event'
		})

		.when('/login',{
			templateUrl: 'app/views/pages/login.html',
			controller: 'mainController',
			controllerAs: 'login'
		})

		.when('/events',{
			templateUrl:'app/views/pages/home.html',
			controller: 'eventController',
			controllerAs: 'event'
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
			controller: 'eventController',

			controllerAs: 'event'
		})



		

		// get rid of the hash in the URL
		$locationProvider.html5Mode(true);
	});