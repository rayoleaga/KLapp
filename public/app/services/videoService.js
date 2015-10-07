angular.module('videoService', [])

	.factory('Video', function($http){
		var videoFactory = {};

		// get kl videos from youtube
		videoFactory.all = function(){
			return $http.get(' https://www.googleapis.com/youtube/v3/search?pageToken=CAUQAA&part=snippet&maxResults=50&order=relevance&q=kelleylennon&key=AIzaSyDWA6_QQZuWaxwrp2YDZDx5JmK1FWtfkSg');
		}

		// videoFactory.videos = function(){
		// 	return $http.get(' https://www.googleapis.com/youtube/v3/search?pageToken=CAUQAA&part=contentDetails&maxResults=50&order=relevance&q=kelleylennon&key=AIzaSyDWA6_QQZuWaxwrp2YDZDx5JmK1FWtfkSg');
		// }

		return videoFactory;
	});
