	
angular.module('videoCtrl', ['videoService'])

.controller('videoController', function($scope, Video) {

	var vm = this;



	// Video.channelInfo()
	// 	.success(function(data) {
	// 		vm.videos = data;
	// 		$scope.channelInfo = data
	// 		$scope.mainVideo = data.items[0].contentDetails.relatedPlaylists.uploads
	// 		$scope.vidUrl = data.items;
	// 		// console.log($scope.vidUrl)
	// 		//console.log(vm.videos.items[0].contentDetails.relatedPlaylists.uploads);
	// 		//console.log($scope.channelInfo.items[0].contentDetails.relatedPlaylists.uploads)


	// 	})

// // this is not the video info change to VIDEO
// 	Video.videoInfo()
// 		.success(function(data){
// 			//vm.vidurl = data;
// 			//console.log(vm.vidurl.items[0].snippet.vidurl);
// 			$scope.video = data;
// 			$scope.mainTitle = data.items[0].snippet.title;
// 			$scope.videoImgUrl = data.items[0].snippet.thumbnails.high.url
// 			//console.log($scope.video.items[0].snippet.thumbnails.high.url );

// 			//var url = '<iframe width="480" height="360" src="https://www.youtube.com/embed/'+vm.vidurl.items[0].snippet.resourceId.videoId+'?showinfo=0"></iframe>';

			
		
// 			})

 // KL search query

 	Video.klVid()
 		.success(function(data){
 			$scope.klVidInfo = data.items;
 			$scope.mainImage = data.items[0].snippet.thumbnails.high.url;
 			$scope.mainVideoId = data.items[0].id.videoId;
 			$scope.youtubeUrl = "https://www.youtube.com/embed/"+$scope.mainVideoId;
 			console.log($scope.youtubeUrl);
 		})		

		

		$scope.videoChange = function(url){
			$scope.mainImage = url;
		}
})

	
			
			
			

		




		



