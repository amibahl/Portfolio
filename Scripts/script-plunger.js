
		var plot;
$(document).ready(function(){
	
	$('.htmltabs').tabs(
	{
	    show:function(id){
		if(id=="tab3")
		{
					var plot1 = $.EPlot($("#placeholder"),  getRandomData() , options,extendedOptions);
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
	$(".combo1").combomenu({selectedValue:3,width:"110px"});
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
		   
	// show overlay on click of pen.
	$(".row .edit-pen").click(function() {
		var dialogID = $(this).find("a").attr("href");
		$(dialogID).overlay();				
	});
	
	
	$("#overlayWait").click(function() {
		//var dialogID = $(this).find("a").attr("href");
		$("#overlayWaitContainer").overlay();	
		     $('.overlayContent').jScrollPane();
		
	});
	
	$("#generalOverlay").click(function() {
		//var dialogID = $(this).find("a").attr("href");
		$("#overlaygeneralContainer").overlay();	
		     
		
	});
		$("#comboControl").combomenu({isCombo:true,onOverlay:true,width: 90});
	$(".closeLink").click(function() {
		var dialogID = $(this).attr("href");
		$(dialogID).overlay("close");
	});
	
	
	$("#lnkPressureHistory").customtoggletab(
	   {width:60, 
    	primaryText:"Open",
	    secondaryText:"Closed",
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
			    display:false
			 });
			 
			 
			 	plot.push( {
				data : res4,
				label : "Line Pr.",					
				color: "#e44eff",
				  unit:"InH2o",
			
			    display:false
			 });
			 
			 	plot.push( {
				data : res3,
				label : "Flow",					
				color: "#379c00",
			    unit:"SCF/Hr",
			    display:false
			 });
        return plot;
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
        xaxis: {  mode : "time",show: true, timeformat : "%H:%M:%S"} ,
	    legend :
		{
		   show: false
		},
	    grid: { hoverable: true, clickable: false }
    };
	
	    var extendedOptions = {
              selectableSeries:true,
			  showToolTip:true
              }
			  
   
	
