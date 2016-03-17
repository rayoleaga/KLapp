angular.module('klApp',[
	'ngAnimate',
	'app.routes',
	'authService',
	'mainCtrl',
	'userCtrl',
	'eventCtrl',
	'videoCtrl',
	'photoCtrl',
	'resumeCtrl',
	'userService',
	'eventService',
	'videoService',
	'photoService',
	'resumeService'
	])

	// application configuration to integrate token into requests
	.config(function($httpProvider){
		// attach out auth interceptor to the http requests
		$httpProvider.interceptors.push('AuthInterceptor');
	});