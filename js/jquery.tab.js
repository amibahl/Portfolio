jQuery.fn.tabPlugin = function (tabNames, tabId, shownTabs, theme) {
	var noOfTabs = tabNames.length;
	var noOfHiddenTabs = noOfTabs - shownTabs;
	var dropTabIndex = shownTabs;
	loadTabs();
	function loadTabs() {
		if (theme == "toggle_plugin") {
			var tabDetails = {
				displayedTabs : getDisplayedTabsDetails(),
				theme : "toggle_plugin"
			};
		} else {
			var tabDetails = {
				displayedTabs : getDisplayedTabsDetails(),
				hiddenTabs : getHiddenTabsDetails(),
				theme : "tabs_plugin"
			};
		}
		$("#tabsTemplate").tmpl(tabDetails).appendTo("#tabs-template");
	}
	
	function getDisplayedTabsDetails() {
		var displayedTabsDetails = [];
		var i;
		if (theme == "toggle_plugin") {
			for (i = 0; i < 2; i++) {
				displayedTabsDetails.push({
					tabClass : "T1",
					hrefDetails : "#" + tabId[i],
					id : tabId[i] + "-tab",
					tabContent : tabNames[i]
				});
			}
		} else {
			for (i = 0; i < shownTabs; i++) {
				displayedTabsDetails.push({
					tabClass : "T1",
					hrefDetails : "#" + tabId[i],
					id : tabId[i] + "-tab",
					tabContent : tabNames[i]
				});
			}
		}
		return displayedTabsDetails;
	}
	
	function getHiddenTabsDetails() {
		var hiddenTabsDetails = [];
		var i;
		for (i = 0; i < noOfHiddenTabs; i++) {
			hiddenTabsDetails.push({
				hiddenTabClass : "T1",
				hiddenHrefDetails : "#" + tabId[dropTabIndex],
				hiddenId : tabId[dropTabIndex] + "-tab",
				hiddenTabContent : tabNames[dropTabIndex]
			});
			dropTabIndex++;
		}
		return hiddenTabsDetails;
	}
	if (theme == "tabs_plugin") {
		var liElement = $(".htmlTabs>ul>li");
		var lastTabLiElement = $(".lastTab>ul>li");
		$(liElement[(shownTabs - 1)]).addClass("noRightBorder");
		lastTabLiElement.last().addClass("lastmenuItem");
		$(".lastTab").bind('click', function () {
			$(".tabDropDown").toggle();
		});
		
		$(".tabDropDown>li").bind('click', function () {
			var tabIndex,
			href;
			var tabsLiElement = $(".tabs > li");
			var tabClicked = $(this).html();
			var lastTab = $(tabsLiElement[shownTabs - 1]).html();
			var lastShownTabIndex = tabsLiElement.last().index() - 1;
			$(tabsLiElement[(shownTabs - 1)]).html(tabClicked);
			tabIndex = $(this).index();
			href = $($(".tabDropDown>li>a")[tabIndex]).attr("href");
			showContent(href);
			$(this).html(lastTab);
		});
	}
	$(".tabs>li").bind('click', function () {
		var toggleIndex = $(this).index();
		var href;
		if (!$(this).hasClass("lastTab")) {
			href = $($(".tabs>li>a")[toggleIndex]).attr("href");
			showContent(href);
		}
	});
	
	$(".toggle>li").bind('click', function () {
		var toggleIndex = $(this).index();
		var href;
		$(".toggle li").removeClass("active");
		$(this).addClass("active");
			href = $($(".toggle>li>a")[toggleIndex]).attr("href");
			showContent(href);
		
	});
	
	function showContent(href) {
		$(".show-tab > div").hide();
		$(href).show();
	};
}