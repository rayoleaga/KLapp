angular.module('resumeCtrl', ['resumeService'])

	.controller('resumeController', function(Resume){
		var vm = this;

		Resume.info()
			.success(function(data){
				vm.myResume = data;
				console.log(vm.myResume[0].name);
			});
	})