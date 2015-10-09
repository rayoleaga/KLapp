$(document).ready(function(){
	// SIDEBAR MENY
	$('#menu-sidebar').hide();
	// 
	$('#menu-icon, #close-menubar').click(function(){

		var effect = 'slide';
		var direction = 'right';
		var duration = 500;
		$('#menu-sidebar').toggle(effect);
	});


})





