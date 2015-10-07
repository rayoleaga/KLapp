angular.module('eventCtrl', ['eventService'])

.controller('eventController', function(Event) {

	var vm = this;


	Event.all()
		.success(function(data) {


			vm.events = data;
			// console.log(vm.events);
		})

	Event.weather()
		.success(function(data){

			vm.weather = data;
			vm.weather.main.temp = Math.floor(vm.weather.main.temp);
			 
		})

	Event.flickr()
		.success(function(data){
			vm.flickr = data;
		//console.log(vm.flickr)
		})



})

