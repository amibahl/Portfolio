/**
 * 
 */
$(document).ready(function(){
	
	$('.htmlTabsAlarms').tabs(
			{
			    show:function(id){
					if(id=="tab2")
					{
						
						//$('#grid').jScrollPane().data('jsp').scrollToRight();	
					
					}
			   }
			}
	);
	visibleHiddenEditPenImage($(".modTableRow"),".tableEditPen");
	applyOverlay("showOverlay");
	$(".checkbox").click(function() {
		var element = $(this);
		var imageSource = element.attr("src");		
		if(imageSource.indexOf("normal") != -1)
			imageSource = imageSource.replace("normal", "selected");
		else if(imageSource.indexOf("selected") != -1)
			imageSource = imageSource.replace("selected", "normal");
		element.attr("src", imageSource);
	});
	$('#acknowledgeAll').bind('click',selectAllAlarms);
	$('.table-checkbox >.checkbox').click(function(){
		var element = $(this);
		var imageSource = element.attr("src");	
		if(imageSource.indexOf("normal") != -1)
		{
			var url = $('#acknowledgeAll > .checkbox').attr("src");
			url = url.replace("selected", "normal");	
			$('#acknowledgeAll > .checkbox').attr("src", url);	
		}
	});

});
function selectAllAlarms()
{
		 var url = $('#acknowledgeAll > .checkbox').attr("src");
		 if(url.indexOf("selected")!=-1)
		 {
			 $('.table-checkbox >.checkbox').each(function(){
				 var element = $(this);
				 var imageSource = element.attr("src");		
				 if(imageSource.indexOf("normal") != -1)
						imageSource = imageSource.replace("normal", "selected");
				 element.attr("src", imageSource);
			 });
		 }
		 else
		 {
			 $('.table-checkbox >.checkbox').each(function(){
				 var element = $(this);
				 var imageSource = element.attr("src");		
				 imageSource = imageSource.replace("selected", "normal");
				 element.attr("src", imageSource);
			 });
		 }
		 
}
function visibleHiddenEditPenImage(selector,editPenSelector)
{
	$(selector).hover(function(){
		$(this).find(editPenSelector).css("visibility","visible");
		},function(){
		$(this).find(editPenSelector).css("visibility","hidden");
		});
}
function applyOverlay(id)
{
	$("."+id).click(function() {
		var dialogID = $(this).find("a").attr("href");
		$(dialogID).modal({
			escClose:false
	});	
	});
	
	
	$(".tableEditPen").click(function() {
		var dialogID = $(this).find("a").attr("href");
		$(dialogID).modal({
			escClose:false,
			containerCss:{width:354}
	});	
	});
	 $(".closeLink").click(function() {
			var dialogID = $(this).attr("href");
			$.modal.close();
	});
	 
	 $("#editAcknowledgeAlarms").addClass('overlayBoxSmall');
}
function translate(element, x, y)
{    
    var translation = "translate(" + x + "px," + y + "px)"

    element.css({
        "transform": translation,
        "-ms-transform": translation,
        "-webkit-transform": translation,
        "-o-transform": translation,
        "-moz-transform": translation
    });
}
function customScroll()
{
	var delta = $(window).scrollTop() - $("#your_table thead").offset().top;
    if(delta > 0)
    {
        translate($("#your_table th"),0,delta-2);
    }
    else
    {
        translate($("#your_table th"),0,0);
    }

}