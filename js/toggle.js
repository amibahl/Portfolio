$.fn.customtoggle = function(opts) {
        var options = $.extend(	   
							   { width: 69,  
							     clsFont:"T7",
								 primaryText:"Switch to Secondary State",
								 secondaryText:"Switch to Primary State",
								 onToggle:function(){},
								 isToggleTab:true
							   }
	                        , opts);

         return this.each(function() {
		        var isPrimary=true;
				var element = $(this);
				var parent = $(this).parent();
				var indexOfElement = element.index();				
				element.html(options.primaryText).addClass(options.clsFont);
				/* Create Toggle Button. */   
	            var mainDiv = $("<div>").addClass("toggle");				
				var lefttoggleDiv = $("<div>");
				var midtoggleDiv = $("<div>");
				var righttoggleDiv = $("<div>");			
				element.appendTo(midtoggleDiv);				
				mainDiv.append(lefttoggleDiv);
				mainDiv.append(midtoggleDiv);
				mainDiv.append(righttoggleDiv);
				parent.append(mainDiv);
	
				if(options.width) {
					midtoggleDiv.css("width", options.width);
				}
                toggleState();
				
		        mainDiv.bind('click',function () {
					      toggleState();
				});
				
				function toggleState(){ 
					  var dispalyText=element.html();
					  if(dispalyText==options.primaryText)
					  {
						 element.html(options.secondaryText);
						 isPrimary=false;
						  setSecondaryClass();
					  }
					  else
					  {
						 element.html(options.primaryText);
						 isPrimary=true;
						 setPrimaryClass();
					  }
					  
					  options.onToggle(isPrimary);
					  return false;
				}
				
				/* incorporate hover functionality. */
				mainDiv.hover(function () {
						  if(isPrimary) {				
							setPrimaryHover();
						  }
						  else
						  {
							setSecondaryHover();
						  }
				},
				function () {
				  
				   if(isPrimary){				
				      removePrimaryHover();
				  }
				  else
				  {
				      removeSecondayHover();
				  }
				
				});
				
				function setPrimaryClass(){
				   mainDiv.find("div").removeClass();
				   lefttoggleDiv.addClass("toggle-left");
				   midtoggleDiv.addClass("toggle-middle");
				   righttoggleDiv.addClass("toggle-right");				
				}
				
				function setSecondaryClass(){
				  mainDiv.find("div").removeClass();
				  lefttoggleDiv.addClass("toggle-secondary-left");
				  midtoggleDiv.addClass("toggle-secondary-middle");
				  righttoggleDiv.addClass("toggle-secondary-right");				
				}
				
				function setPrimaryHover(){
				    mainDiv.find("div").removeClass();
				   	midtoggleDiv.addClass("toggle-middle-hover");
					lefttoggleDiv.addClass("toggle-left-hover");
					righttoggleDiv.addClass("toggle-right-hover");

				}
				
				function removePrimaryHover(){
				     setPrimaryClass();
				}
				
				function setSecondaryHover(){
					mainDiv.find("div").removeClass();
				  	midtoggleDiv.addClass("toggle-secondary-middle-hover");
					lefttoggleDiv.addClass("toggle-secondary-left-hover");
					righttoggleDiv.addClass("toggle-secondary-right-hover");

				}
				
				function removeSecondaryHover(){
				    setSecondaryClass();
				}
	
	});
}


$.fn.customtoggletab = function(opts) {
        var options = $.extend(	   
							   { width: 69,  
							     clsFont:"T7",
								 primaryText:"Primary State",
								 secondaryText:"Secondary State",
								 onToggle:function(){},
								 isToggleTab:true
							   }
	                        , opts);

         return this.each(function() {
		        var isPrimary=true;
				var element = $(this);
				var parent = $(this).parent();
				var indexOfElement = element.index();				
				element.html(options.secondaryText).addClass(options.clsFont);
				element.hide();
				/* Create Toggle Button. */   
	            var mainDiv = $("<div>").addClass("toggle");				
				var lefttoggleDiv = $("<div>");
				var midtoggleLeftDiv = $("<div>");
				var midtoggleCenterDiv = $("<div>");
				var midtoggleRightDiv = $("<div>");
				var righttoggleDiv = $("<div>");			
				midtoggleLeftDiv.html( $("<a>").html(options.primaryText));	
				midtoggleRightDiv.html($("<a>").html(options.secondaryText));	
				mainDiv.addClass(options.clsFont);
				mainDiv.append(lefttoggleDiv);
				mainDiv.append(midtoggleLeftDiv);
				mainDiv.append(midtoggleCenterDiv);
				mainDiv.append(midtoggleRightDiv);
				mainDiv.append(righttoggleDiv);
				parent.html("");
				parent.append(element);
				parent.append(mainDiv);
	
				if(options.width) {
					midtoggleLeftDiv.css("width", options.width);
					midtoggleRightDiv.css("width", options.width);
				}
                toggleState();
				
		        midtoggleLeftDiv.bind('click',function () {
				      if(!isPrimary) {	
					      toggleState();
						  }
				});
					
		        midtoggleRightDiv.bind('click',function () {
				       if(isPrimary) {
					      toggleState();
						  }
				});
				
				
				function toggleState(){ 
					  var dispalyText=element.html();
					  if(dispalyText==options.primaryText)
					  {
						 element.html(options.secondaryText);
						 isPrimary=false;
						  setSecondaryClass();
					  }
					  else
					  {
						 element.html(options.primaryText);
						 isPrimary=true;
						 setPrimaryClass();
					  }
					  
					  options.onToggle(isPrimary);
					  return false;
				}
				
				/* incorporate hover functionality. */
				midtoggleLeftDiv.hover(function () {
						  if(!isPrimary) {										
						     setPrimaryHover();
						  }
				},
				function () {
				  
					   if(!isPrimary){									
							removeSecondaryHover();
					  }
				
				});
				
			   midtoggleRightDiv.hover(function () {
						  if(isPrimary) {				
							setSecondaryHover();
						  }	  
				},
				function () {
				  
					   if(isPrimary){				
							removePrimaryHover();
					  }
				});
				
				function setPrimaryClass(){
				   mainDiv.find("div").removeClass();
				   lefttoggleDiv.addClass("toggle-left");
				   midtoggleLeftDiv.addClass("toggle-middle");
				   midtoggleRightDiv.addClass("toggle-secondary-middle");
				   righttoggleDiv.addClass("toggle-secondary-right");	
				   
				   	   midtoggleCenterDiv.addClass("toggle-center");
				}
				
				function setSecondaryClass(){
				  mainDiv.find("div").removeClass();
				  lefttoggleDiv.addClass("toggle-secondary-left");
				  midtoggleLeftDiv.addClass("toggle-secondary-middle");
				  midtoggleRightDiv.addClass("toggle-middle");
				  righttoggleDiv.addClass("toggle-right");	
				  	   	   midtoggleCenterDiv.addClass("toggle-center");
				 			
				}
				
				function setPrimaryHover(){
				    mainDiv.find("div").removeClass();
				   	midtoggleLeftDiv.addClass("toggle-secondary-middle-hover");
					lefttoggleDiv.addClass("toggle-secondary-left-hover");
					midtoggleRightDiv.addClass("toggle-border-left");
					righttoggleDiv.addClass("toggle-right");
					midtoggleRightDiv.addClass("toggle-middle");
					midtoggleCenterDiv.addClass("toggle-center-hover");
				}
				
				function removePrimaryHover(){
				     setPrimaryClass();
				}
				
				function setSecondaryHover(){
					mainDiv.find("div").removeClass();
				  	midtoggleLeftDiv.addClass("toggle-middle");
					lefttoggleDiv.addClass("toggle-left");
					midtoggleRightDiv.addClass("toggle-secondary-middle-hover");
					righttoggleDiv.addClass("toggle-secondary-right-hover");
					midtoggleLeftDiv.addClass("toggle-border-right");
					midtoggleCenterDiv.addClass("toggle-center-hover");

				}
				
				function removeSecondaryHover(){
				    setSecondaryClass();
				}
	
	});
}