angular.module('eventService', [])
	
	.factory('Event', function($http){
		// create a new object
		var eventFactory = {};

	
		// get all users
		eventFactory.all = function(){
			return $http.get('/api/all-events');
		}

		eventFactory.getResume = function(){
			return $http.get('/resume');
		}

		// 	eventFactory.weather = function(){
		// 	return $http.get('http://api.openweathermap.org/data/2.5/weather?q=providence&units=imperial');
		// }

		// eventFactory.flickr = function(){
		// 	return $http.get(' https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=255432d51bf8afaf92190b9133a357bb&user_id=11723078%40N00&per_page=500&page=&format=json&nojsoncallback=1&auth_token=72157657187830443-d1ca11e3d6522e7b&api_sig=d6732a93bd19209118d51b8bffa27771');
		// }

		// eventFactory.allVideos = function(){
		// return $http.get(' https://www.googleapis.com/youtube/v3/search?part=snippet&q=kelleylennon&key=AIzaSyDWA6_QQZuWaxwrp2YDZDx5JmK1FWtfkSg');
		// }
	
		return eventFactory;
	});

