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

	// YOUTUBE API
	var channelName = "kelleylennon";
	var vidWidth = 480;
	var vidHeight = 360;
	var vidResults = 10;

	// gets the channel info
	$.get(
			"https://www.googleapis.com/youtube/v3/channels", {
				part: 'contentDetails',
				forUsername: channelName,
				key: "AIzaSyDWA6_QQZuWaxwrp2YDZDx5JmK1FWtfkSg" },
				function(data){
					$.each(data.items, function(i, item){
						console.log(item);
						pid = item.contentDetails.relatedPlaylists.favorites;
						// pid stands for Play List Id
						getVids(pid);
					});
				}
		);
	// gets the vidos info
	function getVids(pid){
		$.get(
			"https://www.googleapis.com/youtube/v3/playlistItems", {
				part: 'snippet',
				maxResults: vidResults,
				playlistId: pid,
				key: "AIzaSyDWA6_QQZuWaxwrp2YDZDx5JmK1FWtfkSg" },
				function(data){
					var outputTitle;
					var outputvideo;

					$.each(data.items, function(i, item){
						console.log(item);

						videoTitle = item.snippet.title;
						videoId = item.snippet.resourceId.videoId;
						// holds title info
						outputTitle = '<li><span class="fa fa-play-circle"></span>'+videoTitle+'</li>';
						// appeneds video title 
						$('#video-title').append(outputTitle);
						// holds video
						outputvideo = '<li><iframe height="'+vidHeight+'" width="'+vidWidth+'" src=\"//www.youtube.com/embed/'+videoId+'\??rel=0&amp;showinfo=0" frameborder="0" allowfullscreen"></iframe></li>';
						// appends video
						$('.video-player').append(outputvideo);
					});
				}
		);
	}
})





