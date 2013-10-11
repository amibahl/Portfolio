$(document).ready(function(){	
		
	$('.scroll-pane1').jScrollPane();
	
	$(".combo1").combomenu({selectedValue:3});
	$("#comboTap").combomenu({isCombo:true,onOverlay:true,width: 90});
	$("#comboLoc").combomenu({isCombo:true,onOverlay:true,width: 90});
	  

	//$('.scroll-pane-overlay1').jScrollPane();
	$(".station-row").hover(function(){
		$(this).find("img.pen").show();
		},function(){
		$(this).find("img.pen").hide();
		});
		
		   $("[type='textbox']").spinit(
		   {
			  height : 20, width : 100, min : 0.0, max : 100.0, stepInc : 0.01, fixedFloat : true, fontWeight: 'bold', floatLimit: 2
		   });
		// change the image of checkbox.
	$(".checkbox").click(function() {
		var element = $(this);
		var imageSource = element.attr("src");		
		if(imageSource.indexOf("normal") != -1)
			imageSource = imageSource.replace("normal", "selected");
		else if(imageSource.indexOf("selected") != -1)
			imageSource = imageSource.replace("selected", "normal")
		element.attr("src", imageSource);
	});
		   
	// // show overlay on click of pen.
	// $(".station-edit-pen").click(function() {
		
		// var dialogID = $(this).find("a").attr("href");
		// $(dialogID).modal(
				// {
					// escClose:false,
					// containerCss:{
						// width:354
						// }
				// });	
		
	// });
	// $(".showOverlay").click(function() {
		// var dialogID = $(this).find("a").attr("href");
		// $(dialogID).modal({
			// escClose:true,
			// containerCss:{
						// width:670						
						// }
		// });	
	// });
	 $(".checkbox").unbind("click").click(function() {
		$(this).toggleClass("checkbox-active");		
	}); 
	$("#save-app").click(function(){
		if(!$('.checkbox').hasClass("checkbox-active"))
		{
			$('#App1').hide("slow");			
		}
	});

	$("#showOverlay").click(function() {
		var dialogID = $(this).find("a").attr("href");
		$(dialogID).modal({
			escClose:false
		});	
	});
	
	$(".closeLink").click(function() {
		var dialogID = $(this).attr("href");
		$.modal.close();
	});

	
			
});

function showHideEditPenImage(selector,editPenSelector)
{
	$(selector).hover(function(){
		$(this).find(editPenSelector).show();
		},function(){
		$(this).find(editPenSelector).hide();
		});
}
	
