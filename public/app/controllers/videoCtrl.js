	
angular.module('videoCtrl', ['videoService', 'ngSanitize'])

.controller('videoController',[ '$scope', '$templateCache', '$sce', 'Video',
	function($scope, $templateCache, $sce, Video) {

	var vm = this;


 // KL search query

 	Video.klVid()
 		.success(function(data){
 			$scope.klVidInfo = data.items;
 			// $scope.mainImage = data.items[0].snippet.thumbnails.high.url;
 			// $scope.mainVideoId = data.items[0].id.videoId;
 			$scope.mainInfo = data;
 			$scope.vidId = data.items[0].id.videoId;
 			$scope.youtubeUrl = $sce.trustAsHtml('<iframe width="480" height="360" src="https://www.youtube.com/embed/'+$scope.vidId+'?showinfo=0" frameborder="0" allowfullscreen></iframe>');
 			//console.log($scope.mainInfo);
 		})		

		

		$scope.videoChange = function(url){
			$scope.youtubeUrl = $sce.trustAsHtml('<iframe width="480" height="360" src="https://www.youtube.com/embed/'+url+'?showinfo=0" frameborder="0" allowfullscreen></iframe>');
		}
}]);

	
			
			
			

		




		



