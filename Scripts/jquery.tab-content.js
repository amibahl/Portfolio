jQuery.fn.tabContentPlugin = function (tabNames,tabId) {
	var i;
	var noOfTabs = tabNames.length;
	for (i = 0; i < noOfTabs; i++) {
		$(".show-tab").append("<div></div>");
		$($(".show-tab>div")[i]).addClass("content");
		$($(".show-tab>div")[i]).attr("id",tabId[i]);
		$($(".show-tab>div")[i]).html("Content of "+tabNames[i]+" goes here");
	}
}
