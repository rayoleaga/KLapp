angular.module('photoService', [])
	
	.factory('Photo', function($http){
		var photoFactory = {};

	photoFactory.all = function(){
		// return $http.get('https://graph.facebook.com/226128897420929/photos?access_token=CAAXwIN3sFU8BAORWGec3v5EBURZAviCPkxlvQOyKS20JZArfrm7Sd3o4AZB6tWtxQ6dvhTmj1kF0fBpovZCKwNDkcw9VA3sicxe9ZBAk6nk9qGOrOCgNzmsrrWWxZBcx1kmqMybZC09ZCsZAC85AWynjKAKKQFrKasWi7MQVl9cSTBQbJBXnhzbEqxxPesdSMZCF005QUwM4mQngZDZD');
	}

		return photoFactory;
	})

	

