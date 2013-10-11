$(function () {
    // we use an inline data source in the example, usually data would
    // be fetched from a server
    var data1 = [], totalPoints = 14, data2 = [];
	function getRandomWalk(data)
		{
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
		data2 = getRandomWalk(data2);
        // zip the generated y values with the x values
        var res = [];
		var res2 = [];
        for (var i = 0; i < data1.length; ++i)
		{
              res.push([i*24*60*60*1000, data1[i]]);
			  res2.push([i*24*60*60*1000, data2[i]])
		}
			
			var plot=[];
			plot.push( {
				data : res,
				label : "SP",					
				color: "#ff6c00",
				unit:"F",
				display:true
			 });
			plot.push( {
				data : res2,
				label : "DP",					
				color: "#989898",
			    unit:"MCMF",
			    display:false
			 });
		
		/*----------------------------------------------------*/
		/*
		var d1 = [];
		for (var i = 0; i <= 12; i += 1)
			d1.push([i*60*1000, parseInt(Math.random() * 30)]);

		var d2 = [];
		for (var i = 0; i <= 12; i += 1)
			d2.push([i*60*1000, parseInt(Math.random() * 30)]);
			var plot=[];
			
			plot.push( {
				data : d1,
				label : "SP",					
				color: "#ff6c00",
				unit:"F",
				display:true
			 });
			
			plot.push( {
				data : d2,
				label : "DP",					
				color: "#989898",
			    unit:"MCMF",
			    display:true
			 });
		*/
		/*----------------------------------------------------*/
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

 $(document).ready( function() {
      $('.tab-container').tabs({
		  show:function(id){
			if(id=="tabs1")
			{
				$('.scroll-pane').jScrollPane();		
			}
			else if(id=="tabs2")
			{
				$('.scroll-pane2').jScrollPane();
			}
			else if(id=="tabs3")
			{
				$('.scroll-pane3').jScrollPane();
			}
			
		}
		});	
		$('.fac-row').hover(function(){
			$(this).find("img").show();			
			}, function(){
			$(this).find("img").hide();
		});
    });
