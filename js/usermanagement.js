$(document).ready(function(){
	
	$("#comboUpdateUserAttribute li").click(function() {
        var selected = $(this).text();
		switch(selected)
		{
			case "Privilege":
				$('.userUpdatePassword').slideUp();
				$('.userUpdatePrivilege').slideDown();
				$(".updateUser-btn").click(function() {
					$(".closeLink").click();
				});
			break;
			case "Password":
				$('.userUpdatePrivilege').slideUp();
				$('.userUpdatePassword').slideDown();
	$(".updateUser-btn").click(function() {
		if ( $(".txtBoxUpdateUserCurrPswd").val() == '' )
		{
			$(".txtBoxUpdateUserCurrPswd").css("border","2px solid #FF0000");
			$(".updateUserPswdWarning").show();
		}
	 
		else if ( $(".txtBoxUpdateUserNewPswd").val() == '' )
		{
			if($(".txtBoxUpdateUserCurrPswd").val() != '' )
			{
				$(".updateUserPswdWarning").hide();
				$(".txtBoxUpdateUserCurrPswd").css("border","1px none #000000");
				$(".txtBoxUpdateUserNewPswd").css("border","2px solid #FF0000");
				$(".updateUserPswdWarning").show();
			}
		}
		else if ( $(".txtBoxUpdateUserRetype").val() == '' )
		{
			if($(".txtBoxUpdateUserCurrPswd").val() != '' &&  $(".txtBoxUpdateUserNewPswd").val() != '')
			{
				$(".updateUserPswdWarning").hide();
				$(".txtBoxUpdateUserCurrPswd").css("border","1px none #000000");
				$(".txtBoxUpdateUserRetype").css("border","2px solid #FF0000");
				$(".updateUserPswdWarning").show();
			}
		}
		
		else if($(".txtBoxUpdateUserNewPswd").val() != $(".txtBoxUpdateUserRetype").val())
		{
				$(".updateUserPswdWarning").hide();
				$(".txtBoxUpdateUserCurrPswd").css("border","1px none #000000");
				$(".txtBoxUpdateUserNewPswd").css("border","1px none #000000");
				$(".txtBoxUpdateUserRetype").css("border","2px solid #FF0000");
				$(".updateUserPswdMismatchWarning").show();
		}
		
		else
		{
			$(".updateUserPswdWarning").hide();
			$(".updateUserPswdMismatchWarning").hide();
			$(".closeLink").click();
		}
 
	});
			break;
			case "Priv/Pswd":
				$('.userUpdatePrivilege').slideDown();
				$('.userUpdatePassword').slideDown();
				$(".updateUser-btn").click(function() {
		if ( $(".txtBoxUpdateUserCurrPswd").val() == '' )
		{
			$(".txtBoxUpdateUserCurrPswd").css("border","2px solid #FF0000");
			$(".updateUserPswdWarning").show();
		}
	 
		else if ( $(".txtBoxUpdateUserNewPswd").val() == '' )
		{
			if($(".txtBoxUpdateUserCurrPswd").val() != '' )
			{
				$(".updateUserPswdWarning").hide();
				$(".txtBoxUpdateUserCurrPswd").css("border","1px none #000000");
				$(".txtBoxUpdateUserNewPswd").css("border","2px solid #FF0000");
				$(".updateUserPswdWarning").show();
			}
		}
		else if ( $(".txtBoxUpdateUserRetype").val() == '' )
		{
			if($(".txtBoxUpdateUserCurrPswd").val() != '' &&  $(".txtBoxUpdateUserNewPswd").val() != '')
			{
				$(".updateUserPswdWarning").hide();
				$(".txtBoxUpdateUserCurrPswd").css("border","1px none #000000");
				$(".txtBoxUpdateUserRetype").css("border","2px solid #FF0000");
				$(".updateUserPswdWarning").show();
			}
		}
		
		else if($(".txtBoxUpdateUserNewPswd").val() != $(".txtBoxUpdateUserRetype").val())
		{
				$(".updateUserPswdWarning").hide();
				$(".txtBoxUpdateUserCurrPswd").css("border","1px none #000000");
				$(".txtBoxUpdateUserNewPswd").css("border","1px none #000000");
				$(".txtBoxUpdateUserRetype").css("border","2px solid #FF0000");
				$(".updateUserPswdMismatchWarning").show();
		}
		
		else
		{
			$(".updateUserPswdWarning").hide();
			$(".updateUserPswdMismatchWarning").hide();
			$(".closeLink").click();
		}
 
	});
			break;
		}
})
	$("#comboLoc1").combomenu({isCombo:true,onOverlay:true,width: 90});
	$("#comboAddUser").combomenu({isCombo:true,onOverlay:true,width: 90});
	$("#comboUpdateUser").combomenu({isCombo:true,onOverlay:true,width: 90});
	$("#comboUpdateUserAttribute").combomenu({isCombo:true,onOverlay:true,width: 90});
	$("#comboDeleteUser").combomenu({isCombo:true,onOverlay:true,width: 90});
	$("#comboUpdatePrivilege").combomenu({isCombo:true,onOverlay:true,width: 90});
	
	$(".addUser-btn").click(function() {
		if ( $(".txtBoxAddUser").val() == '' )
		{
			$(".txtBoxAddUser").css("border","2px solid #FF0000");
			$(".addUserWarning").show();
		}
	 
		else if ( $(".txtBoxAddPswd").val() == '' )
		{
			if($(".txtBoxAddUser").val() != '' )
			{
				$(".addUserWarning").hide();
				$(".txtBoxAddUser").css("border","1px none #000000");
				$(".txtBoxAddPswd").css("border","2px solid #FF0000");
				$(".addUserPswdWarning").show();
			}
		}
		else if ( $(".txtBoxAddUserRetype").val() == '' )
		{
			if($(".txtBoxAddUser").val() != '' &&  $(".txtBoxAddPswd").val() != '')
			{
				$(".addUserWarning").hide();
				$(".txtBoxAddUser").css("border","1px none #000000");
				$(".txtBoxAddUserRetype").css("border","2px solid #FF0000");
				$(".addUserPswdWarning").show();
			}
		}
		
		else if($(".txtBoxAddPswd").val() != $(".txtBoxAddUserRetype").val())
		{
				$(".addUserWarning").hide();
				$(".addUserPswdWarning").hide();
				$(".txtBoxAddUser").css("border","1px none #000000");
				$(".txtBoxAddUserPswd").css("border","1px none #000000");
				$(".txtBoxAddUserRetype").css("border","2px solid #FF0000");
				$(".addUserPswdMismatchWarning").show();
		}
		
		else
		{
			$(".addUserWarning").hide();
			$(".addUserPswdWarning").hide();
			$(".addUserPswdMismatchWarning").hide();
			$(".closeLink").click();;
		}
 
	});
	
	

	


	});


// (function( $ ){
	// $.fn.combomenu = function(opts) {
	    // var options = $.extend({ 
	    	// width: 120,  
			// clsFont:"T7",
			// clsFontOverlay:"T7a",
			// clsDisplayMenu:"combo-menu-display",
			// clsSelected:"combo-item-selected",
			// isCombo: false,
			// selectedValue:null,
			// clsSelectedImage:"combo-img-selected",
			// clsCheckBox:"combo-multi-select",
			// indexChanged:function(){} ,
			// onOverlay:false,
			// isMultiSelect:false,
			// selectLimit:2
		// }, opts);

	    // return this.each(function() {
			// var element = $(this);
			// var parent = $(this).parent();
			// var indexOfElement = element.index();	
			// var uncheckedState=0;
	        // var checkedState=1;
		    // var disabledState=-1;
			// var checkAttribute="check";
			// var checkedImage="checkbox-white-selected.png";
		    // var unCheckedImage="checkbox-white-normal.png";
            // var disabledCheckedImage="checkbox-white-normal-disabled.png";
		    // var path="images/";
			// var imgChkDisabled="";	
            // var clsComboLeft="";			
			// var clsComboMiddle="";			
			// var clsComboRight="";	
            // var clsComboLeftHover="";			
			// var clsComboMiddleHover="";			
			// var clsComboRightHover="";				
			// clsComboLeft=options.onOverlay?"combo-overlay-left":"combo-left";
			// clsComboMiddle=options.onOverlay?"combo-overlay-middle":"combo-middle";
			// clsComboRight=options.onOverlay?"combo-overlay-right":"combo-right";
			// clsComboLeftHover=options.onOverlay?"combo-overlay-left-hover":"combo-left-hover";
			// clsComboMiddleHover=options.onOverlay?"combo-overlay-middle-hover":"combo-middle-hover";
			// clsComboRightHover=options.onOverlay?"combo-overlay-right-hover":"combo-right-hover";
			// var anchorFont=options.onOverlay?options.clsFontOverlay:options.clsFont;
			
			// if(!element.is("ul")) throw new Error("Expected element \"ul\".");
			
			// /* Create combo. */    
			// var combo_ul = $("<ul></ul>").addClass("combo").attr("id", element.attr("id"));
			// var combo_li = $("<li></li>");				
			// var leftComboDiv = $("<div>").addClass(clsComboLeft);
			// var midComboDiv = $("<div>").addClass(clsComboMiddle);
			// var rightComboDiv = $("<div>").addClass(clsComboRight);
		
			// combo_li.appendTo(combo_ul);
			// leftComboDiv.appendTo(combo_li);
			// midComboDiv.appendTo(combo_li);
			// rightComboDiv.appendTo(combo_li);
			// element.appendTo(combo_li);				
			// parent.append(combo_ul);				
					
			// if(options.width) {
				// midComboDiv.css("width", options.width);
				// element.css("width", parseInt(options.width, 10) + 26);
				// element.find("li").css("width", parseInt(options.width, 10) + 26); // (leftDiv)5px + (rightDiv)21px
			// }
					
			// /* assign initial text. */
			// var text = element.find("a.initial").html();
			// element.find("a.initial").remove();
			// midComboDiv.html("<a class='"+anchorFont+"' href='#'>"+text+"</a>");
					
			// /* remove "id" attribute from the original ul element */
			// element.removeAttr("id");    
			// element.removeAttr("class");  
			// combo_ul.find("a").addClass(options.clsFont);
			// combo_ul.find("li:eq(0)").bind('click',function () {
				// comboClicked($(this));
				// return false; 
			// });

			// $('body').bind('click',function () {
				// var menu=combo_ul.find("li:eq(0)").find("ul");
				// menu.removeClass(options.clsDisplayMenu);
			// });
		
			// if(!options.isMultiSelect){
				 // combo_ul.find("li:eq(0) > ul > li").bind('click',function () {
					// menuItemClicked($(this));
				// });
			// }
			// else
			// {
			    // combo_ul.find("li:eq(0) > ul > li").each(function () {
			           // var  lnk=$(this).find("a");
						// $("<img>").attr({ 
							// "src": path+unCheckedImage,
							// "class": options.clsCheckBox
						// }).attr(checkAttribute,uncheckedState).insertBefore(lnk);
				// });
				
			    // combo_ul.find("li:eq(0) > ul > li").bind('click',function () {
					// return false;
				// });
				
			  	// combo_ul.find("li:eq(0) > ul >li img").bind('click',function () {
					// menuItemSelected($(this));
				// });
			// }
			
			// setSelectedItem();
			
			// function menuItemSelected(menuCheckbox) {
                // if(!toggleCheckbox(menuCheckbox))
				// {
                   // return false;
                // }				
                // var menuItem=menuCheckbox.parent(); 			
				// swapDisplayText(menuItem);
			    // options.indexChanged(menuItem,menuCheckbox.attr(checkAttribute)==1?true:false);
				// return false;
			// }	

			// function toggleCheckbox(element){
					// var imageSource = element.attr("src");	
                    // if(imageSource.indexOf("disabled") != -1)		
                        // return false;    					
					// else if(imageSource.indexOf("normal") != -1){
						// imageSource = imageSource.replace("normal", "selected");
						// element.attr(checkAttribute,checkedState);
						// }
					// else if(imageSource.indexOf("selected") != -1){
						// imageSource = imageSource.replace("selected", "normal")
						// element.attr(checkAttribute,uncheckedState);
						// }
					// element.attr("src", imageSource);
					// validateSelectLimit();
					// return true;
			// }	


         // function validateSelectLimit()
		  // {
				// var selectedCount=combo_ul.find("["+checkAttribute+"='"+checkedState+"']").size();
				// if(options.selectLimit ){
						// if(selectedCount<options.selectLimit){
						  // var lstDisabled=combo_ul.find("["+checkAttribute+"='"+disabledState+"']");
						  // lstDisabled.attr("src",path+unCheckedImage);
						  // lstDisabled.attr(checkAttribute,uncheckedState);
						// }
						// else
						// {
							// var lstUnchecked=combo_ul.find("["+checkAttribute+"='"+uncheckedState+"']");
							// lstUnchecked.attr("src",path+disabledCheckedImage);
							// lstUnchecked.attr(checkAttribute,disabledState);
						// }
				// }
		  // }			

			// function menuItemClicked(menuItem) {
				// combo_ul.find("."+options.clsSelectedImage).remove();
				// $("<img>").attr({ 
					// "src": "images/combo-item-selected.png",
					// "class": options.clsSelectedImage
				// }).insertBefore(menuItem.find("a"));	 
				// swapDisplayText(menuItem);
			    // options.indexChanged(menuItem,true);
			// }
					
			// function swapDisplayText(menuItem) {
				// if(options.isCombo) {
				    // var selectedText=menuItem.find("a").html();
				    // combo_ul.find("li:eq(0) div a").html(selectedText);
				// }
			// }
					
			// function setSelectedItem() {
				// if(!options.isMultiSelect){
				  // setSingleSelectedItem();
				// }
				// else
				// {
				   // setMultiSelectedItem();
				// }
			// }
			
			// function setMultiSelectedItem()
			// {
			    // var menuItem;
				// if(options.selectedValue) {
				   // for(var i=0;i<options.selectedValue.length;i++)
				    // { 
                      // var selectedItem=options.selectedValue[i];				
					  // menuItem=searchSelectedItem(selectedItem);
					    // if(!menuItem) {
							// menuItem=  combo_ul.find("li:eq(0) > ul > li:eq(0)");
						// }
					  // menuItemSelected(menuItem.find("."+options.clsCheckBox));
					// }
				// }
			// }
			
			// function setSingleSelectedItem()
			// {
			     // var menuItem;
				// if(options.selectedValue) {
					// menuItem=searchSelectedItem(options.selectedValue[0]);
				
				// }
				// if(!menuItem) {
				    // menuItem=  combo_ul.find("li:eq(0) > ul > li:eq(0)");
				// }
					// menuItemClicked(menuItem);
			// }
			
			// function searchSelectedItem(selectedValue)
			// {
			        // var menuItem=null;
			        // var arrayItem=  combo_ul.find("li:eq(0) > ul > li > a");
					// var item;
					// //var item= jQuery.grep(arrayItem, function(n, i){
					// //			  return ($(this).html()==selectedValue);
					// //			});
					// for(var i=0;i<	arrayItem.length;i++)
					// {
					  // if($(arrayItem[i]).html()==selectedValue)
					  // {
					     // item=$(arrayItem[i]);
						 // break;
					  // }
					// }					
					// try{			
						// if(item.parent())
						// {
						  // menuItem= item.parent();
						// }
					// }
					// catch(ex)
					// {
				    	// menuItem=combo_ul.find("li:eq(0) > ul > li:eq(0)");
					// }
					// return menuItem;
			// }
					
			// function comboClicked(combo) {
				// var menu=combo.find("ul");
			    // if(!menu.hasClass(options.clsDisplayMenu)) {
					// menu.addClass(options.clsDisplayMenu);
				// }
				// else {
					// menu.removeClass(options.clsDisplayMenu);
				// }
			// }

			// /* incorporate hover functionality. */
			// combo_ul.hover(function () {
			    // combo_li.find("div").removeClass();
				// midComboDiv.addClass(clsComboMiddleHover);
				// leftComboDiv.addClass(clsComboLeftHover);
				  // rightComboDiv.addClass(clsComboRightHover);
			// },
			// function () {
			    // combo_li.find("div").removeClass();
				// midComboDiv.addClass(clsComboMiddle);
				// leftComboDiv.addClass(clsComboLeft);
				// rightComboDiv.addClass(clsComboRight);
	
			// });
		
		// });
	// }
// })( jQuery )