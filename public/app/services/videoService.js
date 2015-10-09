angular.module('videoService', [])

	.factory('Video', function($http){
		var videoFactory = {};
		// YOUTUBE API
		var userName = "kelleylennon";
		var vidWidth = 480;
		var vidHeight = 360;
		var vidResults = 10;
		var key = "AIzaSyDWA6_QQZuWaxwrp2YDZDx5JmK1FWtfkSg";
		var part = "contentDetails";

		// get kl videos from youtube
		videoFactory.channelInfo = function(){
			return $http.get("https://www.googleapis.com/youtube/v3/channels?part="+part+"&forUsername="+userName+"&key="+key);
		}

		videoFactory.videoInfo = function(){
			return $http.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUiAXR-o7fb9uiJPhB50Pnaw&key="+key);
		}

	videoFactory.klVid = function(){
		return $http.get("https://www.googleapis.com/youtube/v3/search?pageToken=CAUQAA&part=snippet&maxResults=50&order=relevance&q=kelleylennon&key=AIzaSyDWA6_QQZuWaxwrp2YDZDx5JmK1FWtfkSg")
	}

		return videoFactory;
	});
