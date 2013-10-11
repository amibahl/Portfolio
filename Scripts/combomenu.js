(function( $ ){
	$.fn.combomenu = function(opts) {
	    var options = $.extend({ 
	    	width: 69,  
			clsFont:"T7",
			clsFontOverlay:"T7a",
			clsDisplayMenu:"combo-menu-display",
			clsSelected:"combo-item-selected",
			isCombo: false,
			selectedValue:null,
			clsSelectedImage:"combo-img-selected",
			indexChanged:function(){} ,
			onOverlay:false
		}, opts);

	    return this.each(function() {
			var element = $(this);
			var parent = $(this).parent();
			var indexOfElement = element.index();	
            var clsComboLeft="";			
			var clsComboMiddle="";			
			var clsComboRight="";	
            var clsComboLeftHover="";			
			var clsComboMiddleHover="";			
			var clsComboRightHover="";				
			clsComboLeft=options.onOverlay?"combo-overlay-left":"combo-left";
			clsComboMiddle=options.onOverlay?"combo-overlay-middle":"combo-middle";
			clsComboRight=options.onOverlay?"combo-overlay-right":"combo-right";
			clsComboLeftHover=options.onOverlay?"combo-overlay-left-hover":"combo-left-hover";
			clsComboMiddleHover=options.onOverlay?"combo-overlay-middle-hover":"combo-middle-hover";
			clsComboRightHover=options.onOverlay?"combo-overlay-right-hover":"combo-right-hover";
			var anchorFont=options.onOverlay?options.clsFontOverlay:options.clsFont;
			
			if(!element.is("ul")) throw new Error("Expected element \"ul\".");
			
			/* Create combo. */    
			var combo_ul = $("<ul></ul>").addClass("combo").attr("id", element.attr("id"));
			var combo_li = $("<li></li>");				
			var leftComboDiv = $("<div>").addClass(clsComboLeft);
			var midComboDiv = $("<div>").addClass(clsComboMiddle);
			var rightComboDiv = $("<div>").addClass(clsComboRight);
		//	$("<img>").attr("src","images/small-arrow-dw-black.png").appendTo(rightComboDiv);				
			combo_li.appendTo(combo_ul);
			leftComboDiv.appendTo(combo_li);
			midComboDiv.appendTo(combo_li);
			rightComboDiv.appendTo(combo_li);
			element.appendTo(combo_li);				
			parent.append(combo_ul);				
					
			if(options.width) {
				midComboDiv.css("width", options.width);
				element.css("width", parseInt(options.width, 10) + 26);
				element.find("li").css("width", parseInt(options.width, 10) + 26); // (leftDiv)5px + (rightDiv)21px
			}
					
			/* assign initial text. */
			var text = element.find("a.initial").html();
			element.find("a.initial").remove();
			midComboDiv.html("<a class='"+anchorFont+"' href='#'>"+text+"</a>");
					
			/* remove "id" attribute from the original ul element */
			element.removeAttr("id");    
			element.removeAttr("class");  
			combo_ul.find("a").addClass(options.clsFont);
			combo_ul.find("li:eq(0)").bind('click',function () {
				comboClicked($(this));
				return false; 
			});

			$('body').bind('click',function () {
				var menu=combo_ul.find("li:eq(0)").find("ul");
				menu.removeClass(options.clsDisplayMenu);
			});
					
	        combo_ul.find("li:eq(0) > ul > li").bind('click',function () {
				menuItemClicked($(this));
			});
			
			setSelectedItem();

			function menuItemClicked(menuItem) {
				combo_ul.find("."+options.clsSelectedImage).remove();
				$("<img>").attr({ 
					"src": "images/combo-item-selected.png",
					"class": options.clsSelectedImage
				}).insertBefore(menuItem.find("a"));	 
				swapDisplayText(menuItem);
			    options.indexChanged(menuItem);
			}
					
			function swapDisplayText(menuItem) {
				if(options.isCombo) {
				    var selectedText=menuItem.find("a").html();
				    combo_ul.find("li:eq(0) div a").html(selectedText);
				}
			}
					
			function setSelectedItem() {
				var menuItem;
				if(options.selectedValue) {
					var arrayItem=  combo_ul.find("li:eq(0) > ul > li > a");
					var item= jQuery.grep(arrayItem, function(n, i){
								  return ($(this).html()==options.selectedValue);
								})[0];
					if(item)
					{
					  menuItem= item.parent();
					}
				}
				if(!menuItem) {
				    menuItem=  combo_ul.find("li:eq(0) > ul > li:eq(0)");
				}
			    menuItemClicked(menuItem);
			}
					
			function comboClicked(combo) {
				var menu=combo.find("ul");
			    if(!menu.hasClass(options.clsDisplayMenu)) {
					menu.addClass(options.clsDisplayMenu);
				}
				else {
					menu.removeClass(options.clsDisplayMenu);
				}
			}
					
		
			
			/* incorporate hover functionality. */
			combo_ul.hover(function () {
			    combo_li.find("div").removeClass();
				midComboDiv.addClass(clsComboMiddleHover);
				leftComboDiv.addClass(clsComboLeftHover);
				rightComboDiv.addClass(clsComboRightHover);
	

			},
			function () {

			    combo_li.find("div").removeClass();
				midComboDiv.addClass(clsComboMiddle);
				leftComboDiv.addClass(clsComboLeft);
				rightComboDiv.addClass(clsComboRight);
	
			});
		
		});
	}
})( jQuery )