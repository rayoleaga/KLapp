angular.module('photoCtrl', ['photoService'])

	.controller('photoController', function(Photo){
		var vm = this;

		Photo.all()
			.success(function(data){

				vm.photos = data;
				console.log(vm.photos);
			})
	})