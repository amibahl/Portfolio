//This function will run automatically after the page is loaded
 (function($){
        $.fn.tabs = function(options) {
                var settings = $.extend({ 
				tabDisplayCount: 6,
				minTabDisplay:3, 
				active:0,
				show:function(){},
				clsLinkVisible:"menuLnkVisible",
				clsLinkHidden:"menuLnkHidden",
				clsCurrentTab:"tab-current",
				clsNoRightBorderRadius:"no-right-border-Radius",
				clsFont:"T10",
				clsFontMenu:"T9",
				clsLastMenu:"lastMenu",
				clsLastClicked:"lastTab-clicked",
				clsLastActive:"lastTab-Active",
				clsLastTab:"lastTab",
				clsLastTabHover:"lastTab-hover",
				clsDisplayMenu:"display-menu"
				}
				, options);
				
				var tabs=$(this);	
				tabs.find('div.tabsContent').hide();//tabsContent class is used to hide all the tabs content in the start
				$(".tabs").find('li>a').addClass(settings.clsFont);
				// We will add the class to the current open tab to style the active state
				tabs.find("#lastTab >ul>li>a").addClass(settings.clsFontMenu);
				tabs.find("#lastTab >ul").find("li:lt("+settings.tabDisplayCount+")").addClass(settings.clsLinkHidden);
				tabs.find("#lastTab >ul").find("li:gt("+(settings.tabDisplayCount-1)+")").addClass(settings.clsLinkVisible);
				if(tabs.find('ul>li>a').length >settings.tabDisplayCount)
				{
					$(tabs.find('ul li').get(settings.tabDisplayCount-1)).nextAll().hide()
					tabs.find('.lastTab').show();
				}				
           
				
				if(tabs.find("#lastTab").size()) {
					   tabs.children('ul').find("li:lt("+(getTotalTabs())+")").click(function(){				
						    showClickedTabContent($(this).find('a:eq(0)'));
						    hideDropDownMenu();
							  return false; 
					});	
				}
				else {
					  tabs.children('ul').find("li").click(function(){				
						    showClickedTabContent($(this).find('a:eq(0)'));
						    hideDropDownMenu();
							  return false; 
					});	
				}
				
			   tabs.find("#lastTab > ul").find("li").bind('click',function () {
					  toggleDropDownTab($(this).find('a'));
					   hideDropDownMenu();
					    return false; 
				});
				
			   tabs.find("#lastTab").bind('click',function () {
					  lastTabClicked($(this));
				      return false; 
				});
				
				
				$('body').bind('click',function () {
					if(tabs.find("#lastTab > ul").hasClass(settings.clsDisplayMenu))
					 {
					   hideDropDownMenu();	
					 }
				});
				
				
				tabs.find("ul >li").hover(
				  function () {
				         if($(this).hasClass(settings.clsNoRightBorderRadius))
					     {
			              tabs.find("#lastTab").addClass(settings.clsLastTabHover);
						 }
				  },
				  function () {
						tabs.find("#lastTab").removeClass(settings.clsLastTabHover);
				  }
	        	);
				
			    function lastTabClicked(lastTab){
					  if( !lastTab.hasClass(settings.clsLastClicked)){
					        var currentClass=lastTab.attr("class");
							 tabs.find("."+currentClass).addClass(settings.clsLastClicked);
							 tabs.find("."+currentClass).removeClass(currentClass);
							 tabs.find("#lastTab > ul").addClass(settings.clsDisplayMenu);
					  }
					  else{
							hideDropDownMenu();					
					  }
				}
				
				function hideDropDownMenu(){
					 tabs.find("."+settings.clsLastClicked).addClass(settings.clsLastTab);
					 tabs.find("."+settings.clsLastClicked).removeClass(settings.clsLastClicked);
					tabs.find("#lastTab > ul").removeClass(settings.clsDisplayMenu);
					removeLastTabRadius();
				}
				
				if(settings.active < settings.tabDisplayCount){
				     showClickedTabContent(tabs.children('ul').find("li:eq("+settings.active+") > a"));
				 }
				 else
				 {
				     toggleDropDownTab(tabs.find("#lastTab").find("li:eq("+settings.active+") > a"));
				 }
				
				setLastMenuRadius();
				function getCurrentTab(){
				  return tabs.find('.tabs > li >a').find(".tab-current");
				}
				
				function getFirstTab(){
				  return tabs.find('.tabs > li >a').filter(":visible:eq(0)");
				}
				
				function getLastVisibleTab(){
				  return tabs.find('.tabs > li >a').filter(":visible:eq("+(settings.tabDisplayCount-1)+")");
				}		
				
				function showTabContent(tab){
				    var tabDivId= tab.attr('href');				
					$(tabDivId).show(); // It will show the current content of the user selected tab				
					tab.parent().addClass(settings.clsCurrentTab); //It will add the tab-current class to the user selected tab	
					settings.show($(tabDivId).attr("id"));
				}
				
			   function hideTabContent(tab){
				    var tabDivId= tab.attr('href');				
					$(tabDivId).hide(); // It will show the current content of the user selected tab	
	                tab.parent().removeClass(settings.clsCurrentTab); 					
				}
				
				
				function showTab(tab){   
				    var href= tab.attr('href');	
				    var mainTab=tabs.find('.tabs').find("[href='"+href+"']:eq(0)");
					mainTab.parent().show();
                    tab.parent().addClass(settings.clsLinkHidden); 					
				    tab.parent().removeClass(settings.clsLinkVisible);
					showClickedTabContent(mainTab);			
				}
				
			   function hideTab(tab){
				    var href= tab.attr('href');	
				    var mainTab=tabs.find('.tabs').find("[href='"+href+"']:eq(1)");
					tab.parent().hide();
					mainTab.parent().addClass(settings.clsLinkVisible);
				    mainTab.parent().removeClass(settings.clsLinkHidden); 
				}
				
				function showClickedTabContent(tab){
					//"this" is the current anchor where user click and it will get the className from the current    anchor and slice the  first part as we have two class on the anchor 
					 var tabDivId= tab.attr('href');
					 tab.parents("ul").siblings().hide()// It will hide all the tab content
					 tab.parents("ul").find('li').removeClass(settings.clsCurrentTab);// It will remove the tab-current class from the previous tab to remove the active style
					 showTabContent(tab);
					 removeLastTabRadius();
				}

				function toggleDropDownTab(tab){
				    var visibleTabCount=checkCurrentVisibleTabs();
				    var lastVisibleTab=  getLastVisibleTab();
				    hideTab(lastVisibleTab);
				    hideTabContent(lastVisibleTab);											
				    showTab(tab);
					setLastMenuRadius();
				}
				
				function checkCurrentVisibleTabs(){
				  var length=tabs.find('ul:eq(0)> li').filter(":visible").length;
			      return length-1;
				}

				function getTotalTabs(){
				  var length=tabs.find('ul:eq(0) > li').length;
				  return length-1;
				}
				
			    function removeLastTabRadius(){
				  tabs.find('.tabs > li').removeClass(settings.clsNoRightBorderRadius);					 
				  var lastVisibleTab=  getLastVisibleTab();
				  lastVisibleTab.parent().addClass(settings.clsNoRightBorderRadius);
				  if( lastVisibleTab.parent().hasClass(settings.clsCurrentTab))
				  {
				    	 tabs.find("."+settings.clsLastTab).addClass(settings.clsLastActive);
						 tabs.find("."+settings.clsLastTab).removeClass(settings.clsLastTab);
				  }
				  else
				  { 
				     	 tabs.find("."+settings.clsLastActive).addClass(settings.clsLastTab);
						 tabs.find("."+settings.clsLastActive).removeClass(settings.clsLastActive);
				  }
				}
				
				function setLastMenuRadius(){
				    tabs.find("#lastTab >ul>li").removeClass(settings.clsLastMenu);
					tabs.find("#lastTab >ul").find("."+settings.clsLinkVisible).last().addClass(settings.clsLastMenu);
				}
				
			
		}
})(jQuery);
		
		