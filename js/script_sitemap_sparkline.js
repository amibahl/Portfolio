$(function () {
    // we use an inline data source in the example, usually data would
    // be fetched from a server
    var data1 = [], totalPoints = 14, data2 = [];
	function getRandomWalk(data){
		 if (data.length > 0)
			data = data.slice(1);

		// do a random walk
		while (data.length < totalPoints) {
			var prev = data.length > 0 ? data[data.length - 1] : 50;
			var y = prev + Math.random() * 500000 - 250000;
			if (y < 0)
				y = 0;
			if (y > 250000)
				y = 250000;
			data.push(y);
		}
		return data;
	}
    function getRandomData() {
       	data1 = getRandomWalk(data1);		
        // zip the generated y values with the x values
        var res = [];
		var res2 = [];
        for (var i = 0; i < data1.length; ++i)
		{
              res.push([i*24*60*60*1000, data1[i]]);			 
		}
			
			var plot=[];
			plot.push( {
				data : res,
				label : "SP",					
				color: "#ff6c00",
				unit:"F",
				display:true
			 });
			
        return plot;
    }

     // setup plot
    var options = {
        
        xaxis: {  mode : "time",show: true, timeformat : "%d", color: '#999999',tickLength: 0,ticks:10} ,
		yaxis: {tickColor: '#444',
				color: '#999999',
				labelWidth: 50,
				labelAlign: 'left',
				ticks: [0,100000,200000,300000,400000,500000],
				font:{
				 size: 12,				 
				 weight: "normal",
				 family: "arial"				 
			   },			   			  
     	   },
		series: { stack: true, shadowSize: 0 , bars: {show: true, barWidth: 24*60*60*1000*0.4, align: 'center', fill:1}}, 
	    legend :
		{
		   show: false
		},
	    grid: { hoverable: true, clickable: false, borderWidth:0 }
    };
	
	    var extendedOptions = {
              selectableSeries:false,
			  showToolTip:true
              }
	
	
		
    var plot = $.EPlot($("#placeholder"),  getRandomData() , options,extendedOptions);

    function update() {
        plot.setData( getRandomData() );
        plot.draw();     
		//$('.tickLabel').css('color','#999');
    }
	update();
	

});

function updateCarousel(){
	if($('.prev').hasClass('disable')){
		$('.prev').animate({			  
		width: '0px'
		},500);
		$('.viewport').animate({			  
		width: '953px'					
		},500);
	}
	/*else{
		$('.prev').animate({			  
		width: '25px'
		},500);				  
		$('.viewport').animate({			  
		width: '928px'					
		},500);
	}*/
	else if($('.next').hasClass('disable')){
		$('.next').animate({			  
		width: '0px'
		},500);
		$('.viewport').animate({			  
		width: '953px'					
		},500);
	}
	else{
		$('.prev').animate({			  
		width: '25px'
		},500);		
		$('.next').animate({			  
		width: '25px'
		},500);				  
		$('.viewport').animate({			  
		width: '928px'					
		},500);
	}
}

$(document).ready(function(){
	
$('.carousel-content').tinycarousel({ display: 1, callback:updateCarousel,duration:500 });
 var options = {
    type: 'line',
    width: '88',
    height: '20',
    lineColor: '#ffffff',
    fillColor: '',
    spotColor: '',
    minSpotColor: '',
    maxSpotColor: '',
	lineWidth:'1.5'};

$('#northwell1-spark').sparkline([8,75,3,5,1,6,19,92,76],options);
$('#northwell2-spark').sparkline([1,44,76,6,8,25,3,45,2,6,19,2,6],options);
$('#northwell3-spark').sparkline([1,44,96,25,3,45,21,6,19,2,6],options);
$('#eastwell1-spark').sparkline([1,44,3,45,21,6,19,2,6],options);
$('#eastwell2-spark').sparkline([1,44,3,45,21,6,19,2,6],options);
$('#southwell1-spark').sparkline([1,44,3,45,21,6,19,2,6],options);
$('#southwell2-spark').sparkline([1,44,3,45,21,6,19,2,6],options);
});