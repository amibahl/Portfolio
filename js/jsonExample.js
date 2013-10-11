 $(document).ready(function(){
 $("#myButton").click(function() {
         var returnData = "";
		$("div#myOutput").html(" ");
		$("div#myOutput").html(data.firstName);
		//alert(data.firstName);
    });
	
	$("#myClearButton").click(function() {
        $("div#myOutput").html("This data was fetched from a JSON file");
        return (false);
    });
});