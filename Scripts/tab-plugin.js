$(document).ready(function(){

	var tabNames = ["Home","Intro","About Me","Contact","Products","Careers","Profile","Login"];
	var tabId = ["Home","Intro","About Me","Contact","Products","Careers","Profile","Login"];
	var shownTabs = 5;
	$("#tabButton").bind('click', function () {
		emptyContent();
		$(".htmlTabs").tabPlugin(tabNames,tabId,shownTabs,"tabs_plugin");
		$(".show-tab").tabContentPlugin(tabNames,tabId);
	});
	$("#toggleButton").bind('click', function () {
		emptyContent();
		$(".htmlTabs").tabPlugin(tabNames,tabId,shownTabs,"toggle_plugin");
		$(".show-tab").tabContentPlugin(tabNames,tabId);
	});
	
	function emptyContent(){
		$(".htmlTabs").empty();
		$(".show-tab").empty();
	}
});