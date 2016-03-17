angular.module('userCtrl', ['userService'])

.controller('userController', function(User) {

	var vm = this;


	User.all()
		.success(function(data) {
			// when all the users come back remove the processing variable
			vm.processing = false;
			vm.users = data;

		});

	// function to delete user
	vm.deleteUser = function(id){
		vm.processing = true;


		User.delete(id)
			.success(function(data){

				// get all users to update table
				// you can also set up your api
				// to turn the list of users wit the delte call
				User.all()
					.success(function(data){
						vm.processing = false;
						vm.users = data;
					});

			});


		
	};




})

.controller('userCreateController', function(User){
	var vm = this;

	// variable to hide show element of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create user
	vm.saveUser = function(){
		vm.processing = true;

		// clear message
		vm.message = '';

		// use the create function in the userService
		User.create(vm.userData)
			.success(function(data){
				vm.processing = false;

				// clear form
				vm.userData = {};
				vm.message = data.message;
			});
	};
})



.controller('userEditController', function($routeParams, User){
	var vm = this;

	// variable to hide show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get user data for the user you want to edit
	// $routeParams is the way we grab data from the URL

	User.get($routeParams.user_id)
		.success(function(data){
			vm.userData = data;
		});

		// function tos save the user
		vm.saveUser = function(){
			vm.processing = true;
			vm.message = '';

			// call the userService function to updata
			User.update($routeParams.user_id, vm.userData)
				.success(function(data){
					vm.processing = false;

					// clear form
					vm.userData = {};

					// bind the message from our API to vm.message
					vm.message = data.message;
				});
		};
});















