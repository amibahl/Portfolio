
		var plot;
$(document).ready(function(){
			$(".row").hover(function(){
		$(this).find(".edit-pen").show();
		},function(){
		$(this).find(".edit-pen").hide();
		});
	$('.htmltabs').tabs(
	{
	
	
	    show:function(id){
		 // $("#leftOverview ").show('slow');
		   // $("#tab3").delay(10).hide('fast');
		      $("#leftOverview ").show();	
		if(id=="tab3")
		{
	     	
 //  $("#tab3").hide();
		 
              
		        var options1 = {
					series: { shadowSize: 0 , bars: {show: false, lineWidth: 10}}, 
					xaxis: {  mode : "time",show: true, timeformat : "%H:%M:%S",color: '#fff'} ,
					yaxis: {  color: '#fff'} ,
					legend :
					{
					   show: false
					},
					grid: { hoverable: true, clickable: false }
				};
				 //  var plot1 = $.EPlot($("#placeholder"),  getRandomData()[0] , options1,extendedOptions);
				   //var plot2 = $.EPlot($("#placeholder2"),  getRandomData()[1] , options1,extendedOptions);
	        
			  
			  	       $("#lnkToggle").customtoggletab(
						   {width:80, 
							primaryText:"Collapse",
							secondaryText:"Expand",
							onToggle:function(isPrimary)
							{
							  if(!isPrimary)
							  {
							  	$("#placeholder2").removeClass();
								$("#placeholder2").addClass("placeHolder5");
								$("#placeholder").removeClass();
								$("#placeholder").addClass("placeHolder5");
													
							    var offset =  $("#leftOverview ").offset();
								 $("#leftOverview ").hide();			 
								 $("#tab3").css(
								 {
									position:"absolute",
									left:offset.left,
									width:"978px"
								 });
								var plot1 = $.EPlot($("#placeholder"),  getRandomData()[0] , options1,extendedOptions);
				               // var plot2 = $.EPlot($("#placeholder2"),  getRandomData()[1] , options1,extendedOptions);
												
							  }
							  else
							  {
							        $("#placeholder2").removeClass();
									$("#placeholder2").addClass("placeHolder2");
									$("#placeholder").removeClass();
									$("#placeholder").addClass("placeHolder2");
							        $("#leftOverview ").show();			 
									$("#tab3").css(
									{
										position:"relative",
										left:0,
										width:"100%"
									});
									var plot1 = $.EPlot($("#placeholder"),  getRandomData()[0] , options1,extendedOptions);
				                  //  var plot2 = $.EPlot($("#placeholder2"),  getRandomData()[1] , options1,extendedOptions);
											
							  }
						}
						});
				
		}
		else if(id=="tab2")
		{
		//  $('.scroll-pane-stats').jScrollPane();
	            $('.scroll-pane-stats-cycle').jScrollPane();
				
		}
		else if(id=="tab5")
		{
		   // $('.scroll-pane-waiting').jScrollPane();

		}
		
		}
	  }
	);
	$('.scroll-pane').jScrollPane();

		
		$(".firstComboItem").on({click: 
				  function () {
					$("#graph").hide();
					$("#grid").show();
					   
				  }
				}); 
		
		
		
		
		$(".lastComboItem").on({click: 
				  function () {
					$("#grid").hide();
					$("#graph").show();
					
					}
				});  
		
		
		
	$('div.leftOverviewDivEnclosingNonEditRows').not(':first').css('padding-top','17px');
//	$('div.leftOverviewDivEnclosingNonEditRows:first').css('padding-top','15px');
	
	//$('div.leftOverviewEditRow').not(':first').css('padding-top','17px');
	
	$(".leftOverviewEditRow").hover(function(){
		$(this).find(".overviewPen").show();
		},function(){
		$(this).find(".overviewPen").hide();
		});
		
	
//	$('div.leftOverviewEditRow:first').css('padding-top','15px');
//		$('.leftOverviewEditRow').click(function(){
//		alert("Clicked");
//	});
		
	$('.scroll-pane-stats-cycle').jScrollPane();
	$('.scroll-pane').jScrollPane();
	$(".combo1").combomenu({selectedValue:3,width:"80px"});
	$(".combo2").combomenu({selectedValue:3});
	  

	$(".row").hover(function(){
		$(this).find("img.pen").show();
		},function(){
		$(this).find("img.pen").hide();
		});
		
		$(".analysisEditRow").hover(function(){
		$(this).find(".analysisPen").show();
				$(this).find(".analysisPenOpen").show();
		},function(){
		$(this).find(".analysisPen").hide();
			$(this).find(".analysisPenOpen").hide();
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
		   
		   
	
	

	
	$("#overlayWait").click(function() {
		//var dialogID = $(this).find("a").attr("href");
		$("#overlayWaitContainer").modal({
			escClose:false
		});			
		     $('.overlayContent').jScrollPane();
		
	});
	
	$("#generalOverlay").click(function() {
		//var dialogID = $(this).find("a").attr("href");
		$("#overlaygeneralContainer").modal({
			escClose:false,
			containerCss:{
						width:300
						}
		});		
		     
		
	});
		$("#comboControl").combomenu({isCombo:true,onOverlay:true,width: 90});
	$(".closeLink").click(function() {
		var dialogID = $(this).attr("href");
		$.modal.close();
	});
	
	
	
	$("#lnkPressureHistory").customtoggletab(
	   {width:60, 
    	primaryText:"Open",
	    secondaryText:"Close",
		onToggle:function(isPrimary)
		{
		  if(isPrimary)
		  {
			$("#statsClose").hide();
			 $("#statsOpen").show();
			   $('.scroll-pane-stats-cycle').jScrollPane();
		  }
		  else
		  {
		  $("#statsClose").show();
			 $("#statsOpen").hide();
			   $('.scroll-pane-stats-cycle').jScrollPane();
		  }
	}
	});
			
});


    var data = [], totalPoints = 300;
    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);

        // do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
		var res2 = [];
		var res3 = [];
		var res4 = [];
        for (var i = 0; i < data.length; ++i)
		{
              res.push([i*i*1000, data[i]]);
			  res2.push([i*i*1000, data[i]*( Math.random() - 10 - 5)]);
			  res3.push([i*i*1000, data[i]*( Math.random() - 8 - 2)]);
			  res4.push([i*i*1000, data[i]*( Math.random() - 20 - 15)]);
		}
			
			var plot=[];
			var plot1=[];
            var multiPlot=[];
			plot.push( {
				data : res,
				label : "Casing Pr.",					
				color: "#e3660b",
				unit:"PSIA",
				display:true
			 });
			plot.push( {
				data : res2,
				label : "Tubing Pr.",						
				color: "#0084ff",
			    unit:"InH2o",
				yaxis: 2,
			    display:true
			 });
			 
			 	plot.push( {
				data : res4,
				label : "Line Pr.",					
				color: "#e44eff",
				unit:"InH2o",
			    display:true
			 });
			 
			 	plot.push( {
				data : res3,
				label : "Flow",					
				color: "#379c00",
			    unit:"SCF/Hr",
				yaxis: 2,
			    display:true
			 });
			 
			 
			 plot1.push( {
				data : res,
				label : "Casing Pr.",					
				color: "#e3660b",
				unit:"PSIA",
				display:false
			 });
			plot1.push( {
				data : res2,
				label : "Tubing Pr.",						
				color: "#0084ff",
			    unit:"InH2o",
				yaxis: 2,
			    display:false
			 });
			 
			 
			 	plot1.push( {
				data : res4,
				label : "Line Pr.",					
				color: "#e44eff",
				  unit:"InH2o",
			
			    display:true
			 });
			 
			 	plot1.push( {
				data : res3,
				label : "Flow",					
				color: "#379c00",
			    unit:"SCF/Hr",
				yaxis: 2,
			    display:true
			 });
			 
			 multiPlot.push(plot);
			 		 multiPlot.push(plot1);
        return multiPlot;
    }

    // setup control widget
    var updateInterval = 30;
    $("#updateInterval").val(updateInterval).change(function () {
        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1)
                updateInterval = 1;
            if (updateInterval > 2000)
                updateInterval = 2000;
            $(this).val("" + updateInterval);
        }
    });

    // setup plot
    var options = {
        series: { shadowSize: 0 , bars: {show: false, lineWidth: 10}}, 
        xaxis: {  mode : "time",show: true, timeformat : "%H:%M:%S",	color: '#fff'} ,
		yaxis: {  color: '#fff'} ,
	    legend :
		{
		   show: false
		},
	    grid: { hoverable: true, clickable: false }
    };
	
	    var extendedOptions = {
              selectableSeries:true,
			  showToolTip:true,
			  seriesLimit:4,
			  setMultipleAxis:true
              }
			  
   
	
