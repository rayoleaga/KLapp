	
angular.module('videoCtrl', ['videoService'])

.controller('videoController', function($scope, Video) {

	var vm = this;


	Video.all()
		.success(function(data) {
			vm.videos = data;

			//console.log(vm.videos.items[0].id.videoId);
			//console.log(vm.videos);
			
			



		})

		

//<iframe width="480" height="360" src="?showinfo=0" frameborder="0" allowfullscreen></iframe>


		//"https://www.youtube.com/embed/"+vm.videos.id.VideoId+"?showinfo=0";





	


})

