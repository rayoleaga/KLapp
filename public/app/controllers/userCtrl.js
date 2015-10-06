angular.module('userCtrl', ['userService'])

.controller('userController', function(User) {

	var vm = this;


	User.all()
		.success(function(data) {


			vm.users = data;
		});


})

