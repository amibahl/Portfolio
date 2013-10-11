
		var plot;
$(document).ready(function(){

    $(".combo3").combomenu({selectedValue:["01W03FR","02W02TP"],width:"100px",isMultiSelect:true,indexChanged:
	function(item,checked){
	  var div="#"+item.attr("file");
	  if(checked)
	  {
	    $(div).show();
	  }
	  else
	  {
	    $(div).hide();
	  }
	}
	
	});
	$(".combo1").combomenu({selectedValue:["Graph"],width:"80px"});
	$(".combo2").combomenu({selectedValue:["Graph"]}); 
    var plot1 = $.EPlot($("#placeholder"),  getRandomData()[0] , options,extendedOptions);
	var plot2 = $.EPlot($("#placeholder2"),  getRandomData()[1] , options,extendedOptions);
	var plot3 = $.EPlot($("#placeholder3"),  getRandomData()[2] , options,extendedOptions);
	var plot4 = $.EPlot($("#placeholder4"),  getRandomData()[3] , options,extendedOptions);
	var plot5 = $.EPlot($("#placeholder5"),  getRandomData()[4] , options,extendedOptions);
    $("#trend2").hide();
	$("#trend4").hide();
	$("#trend5").hide();
			
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
		var res5 = [];
		var res6 = [];
		var res7 = [];
		var res8 = [];
		var res9 = [];
		var res10 = [];
		var res11 = [];
		var res12 = [];
		var res13 = [];
		var res14 = [];
		var res15 = [];
		var res16 = [];
		var res17 = [];
		var res18 = [];
        for (var i = 0; i < data.length; ++i)
		{
              res.push([i*i*1000, data[i]]);
			  res2.push([i*i*1000, data[i]*( Math.random() - 10 - 5)]);
			  res3.push([i*i*1000, data[i]*( Math.random() - 8 - 2)]);
			  res4.push([i*i*1000, data[i]*( Math.random() - 200 - 15)]);
			  res5.push([i*i*1000, data[i]*( Math.random() - 300 - 15)]);
			  res6.push([i*i*1000, data[i]*( Math.random() - 400 - 15)]);
			  res7.push([i*i*1000, data[i]*( Math.random() - 500 - 15)]);
			  res8.push([i*i*1000, data[i]*( Math.random() - 600 - 15)]);
			  res9.push([i*i*1000, data[i]*( Math.random() - 700 - 15)]);
			  res10.push([i*i*1000, data[i]*( Math.random() - 800 - 15)]);
			  res11.push([i*i*1000, data[i]*( Math.random() - 900 - 15)]);
			  res12.push([i*i*1000, data[i]*( Math.random() - 1000 - 15)]);
			  res13.push([i*i*1000, data[i]*( Math.random() - 1100 - 15)]);
			  res14.push([i*i*1000, data[i]*( Math.random() - 1200 - 15)]);
			  res15.push([i*i*1000, data[i]*( Math.random() - 1300 - 15)]);
			  res16.push([i*i*1000, data[i]*( Math.random() - 1400 - 15)]);
			  res17.push([i*i*1000, data[i]*( Math.random() - 1500 - 15)]);
			  res18.push([i*i*1000, data[i]*( Math.random() - 1600 - 15)]);
		}
			
			var plot=[];
			var plot1=[];
			var plot3=[];
			var plot4=[];
			var plot5=[];
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
				yaxis: 1,
			    display:true
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
				yaxis: 1,
			    display:true
			 });
			 
			 
			  plot3.push( {
				data : res5,
				label : "Ext",					
				color: "#B86C4B",
				unit:"&deg;F",
			    display:true
			 });
			 plot3.push( {
				data : res6,
				label : "Energy",					
				color: "#80C10B",
				unit:"&deg;F",
			    display:true
			 });
			 plot3.push( {
				data : res7,
				label : "Temp",					
				color: "#8BB0C0",
				unit:"&deg;F",
			    display:true
			 });
			 plot3.push( {
				data : res8,
				label : "DP Min",					
				color: "#2CCCCC",
				unit:"InH2o",
			    display:true
			 });
			 plot3.push( {
				data : res9,
				label : "DP Max",					
				color: "#E9967A",
				unit:"InH2o",
			    display:true
			 });
			 plot3.push( {
				data : res10,
				label : "Dp PctLo",					
				color: "#FFD700",
				unit:"InH2o",
			    display:true
			 });
			 plot4.push( {
				data : res11,
				label : "Dp PctHi",					
				color: "#ADD8E6",
				unit:"InH2o",
			    display:true
			 });
			 plot4.push( {
				data : res12,
				label : "SP Min",					
				color: "#FFFFE0",
				unit:"PSIA",
			    display:true
			 });
			 plot4.push( {
				data : res13,
				label : "SP Max",					
				color: "#FFC0CB",
				unit:"PSIA",
			    display:true
			 });
			 plot4.push( {
				data : res14,
				label : "TF Min",					
				color: "#BDB76B",
				unit:"&deg;F",
			    display:true
			 });
			 plot5.push( {
				data : res15,
				label : "TF Max",					
				color: "#BDB76B",
				unit:"SCF/Hr",
			    display:true
			 });
			 plot5.push( {
				data : res16,
				label : "TF PctLo",					
				color: "#0397ea",
				unit:"SCF/Hr",
			    display:true
			 });
			 plot5.push( {
				data : res17,
				label : "TF PctHi",					
				color: "#fdac26",
				unit:"SCF/Hr",
			    display:true
			 });
			 plot5.push( {
				data : res18,
				label : "Contract Hr",					
				color: "#ff0000",
				unit:"&deg;F",
			    display:true
			 });
			 
			 
			 multiPlot.push(plot);
			 multiPlot.push(plot1);
			 multiPlot.push(plot3);
			 multiPlot.push(plot4);
			 multiPlot.push(plot5);
				 
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
			  
   
	
