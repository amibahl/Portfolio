//jquery

$.fn.overlay = function(options) {
	var isOpen = false;				
	
	var showOverlayBox = function() {		
		//if box is not set to open then don't do anything		
		if(!isOpen) return;
		// set the properties of the overlay box, the left and top positions
			var cls=window.dialog.attr("class");
		$(window.dialog).css({
			display: "block",
		
			left:( $(window).width() - $("."+cls).width() )/2,
			top:( $(window).height() - $("."+cls).height() )/3,
			position: "absolute"
		});
		// set the window background for the overlay. i.e the body becomes darker
		$(".bgCover").css({
			display: "block",
			width: "100%",
			height: "100%"
		});
	};
	
	var doOverlayOpen = function() {
		//set status to open
		isOpen = true;
		showOverlayBox();
		$(".bgCover").css({opacity:0}).animate( {opacity:0.5} );
		// dont follow the link : so return false.
		return false;
	}
	
	var doOverlayClose = function() {
		//set status to closed
		isOpen = false;
		$(window.dialog).css("display", "none");
		// now animate the background to fade out to opacity 0.
		// and then hide it after the animation is complete.
		$(".bgCover").animate( {opacity:0}, null, null, function() { $(this).hide(); } );
	};
	
	
	
	// if window is resized then reposition the overlay box.
	//$(window).bind('resize',showOverlayBox);
	
	// Invoke the function to open the dialog.
	
	if(options == "close")  {		
		doOverlayClose();
	}
	else {		
		window.dialog = $(this);			
		doOverlayOpen();
	}
};