var api;
$(document).ready(function(){
	
	applyTabs();
	visibleHiddenEditPenImage($(".modTableRow"),".tableEditPen");
	showHideEditPenImage($(".leftOverviewEditRow"),".overviewPen");
	showHideEditPenImage($(".leftOverviewEditRow-Top"),".overviewPen");
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
	
	
	$("#comboPolarity").combomenu({isCombo:true,onOverlay:true,width: 90});
	$("#comboControlMode").combomenu({isCombo:true,onOverlay:true,width: 90});
	
	$(".combo > li").hover(
			  function () {
				$(this).find(".combo-middle").addClass("combo-middle-hover");
				$(this).find(".combo-middle").removeClass("combo-middle");
				$(this).find(".combo-left").addClass("combo-left-hover");
				$(this).find(".combo-left").removeClass("combo-left");
				$(this).find(".combo-right").addClass("combo-right-hover");
				$(this).find(".combo-right").removeClass("combo-right");
			  },
			  function () {
				$(this).find(".combo-middle-hover").addClass("combo-middle");
				$(this).find(".combo-middle-hover").removeClass("combo-middle-hover");						
				$(this).find(".combo-left-hover").addClass("combo-left");
				$(this).find(".combo-left-hover").removeClass("combo-left-hover");						
				$(this).find(".combo-right-hover").addClass("combo-right");
				$(this).find(".combo-right-hover").removeClass("combo-right-hover");
			  }
	);
	
	
	  $("[type='textbox']").spinit(
			   {
				  height : 20, width : 100, min : 0, max : 60000, stepInc : 1, fixedFloat : true, fontWeight: 'bold', floatLimit: 0
			   });

});
function applyOverlay(id)
{
	$("#"+id).click(function() {
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
	 
	 $(".overviewPen").click(function() {
			
			var dialogID = $(this).find("a").attr("href");
			$(dialogID).modal(
					{
						containerId :dialogID,
						escClose:false
					});	
			 
		});
	 $("#status_resetSystem").addClass('overlayBoxSmall');
	 $("#status_controlMode").addClass('overlayBoxSmall');
}
function applyTabs()
{
	$('.htmltabs1').tabs(
	{
	    show:function(id){
		if(id=="tab1")
		{
			$("#grid").show();	
			//$('#grid').jScrollPane().data('jsp').scrollToRight();	
		
		}
		else if(id=="tab2")
		{
			$("#analog-grid").show();	
			$('#analog-grid').jScrollPane();
			$("#show-less").click(showMoreLessColumns(".show-less","#analog-grid",".showHideOnMore"));
		}
		else if(id=="tab3")
		{
			$("#grid3").show();	
			//$('#grid3').jScrollPane().data('jsp').scrollToRight();
		}
		
		}
	  }
	);
}

function visibleHiddenEditPenImage(selector,editPenSelector)
{
	$(selector).hover(function(){
		$(this).find(editPenSelector).css("visibility","visible");
		},function(){
		$(this).find(editPenSelector).css("visibility","hidden");
		});
}

function applyScrollBar_StatusControlSection()
{
	$(".status-control-scroll-pane").jScrollPane();
	$(".status-control-edit-scroll-pane").jScrollPane();
}

function showHideEditPenImage(selector,editPenSelector)
{
	$(selector).hover(function(){
		$(this).find(editPenSelector).show();
		},function(){
		$(this).find(editPenSelector).hide();
		});
}



function showMoreLessColumns(toggleClass,scrollGrid,columnClass) {
	 var api ;
	 $(toggleClass).toggle(function(){
		 	$(columnClass).css('display','table-cell');
		 	api = $(scrollGrid).jScrollPane().data('jsp');
		 	api.scrollToRight();
		 	$(this).text("<<< Collapse");
		 },
		 function(){
			 api.scrollToLeft();
			 $(columnClass).css('display','none');
			 $(scrollGrid).jScrollPane();
			 $(this).text("Expand >>>");
	 });
	 return false;
};
