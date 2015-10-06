angular.module('klApp',[
	'ngAnimate',
	'app.routes',
	'authService',
	'mainCtrl',
	'userCtrl',
	'eventCtrl',
	'userService',
	'eventService'
	])

	// application configuration to integrate token into requests
	.config(function($httpProvider){
		// attach out auth interceptor to the http requests
		$httpProvider.interceptors.push('AuthInterceptor');
	});