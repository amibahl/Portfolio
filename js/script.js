
		var plot;
$(document).ready(function(){
			$(".leftOverviewEditRow").hover(function(){
		$(this).find(".overviewPen").show();
		},function(){
		$(this).find(".overviewPen").hide();
		});
		
			$(".row").hover(function(){
		$(this).find("img.pen").show();
		},function(){
		$(this).find("img.pen").hide();
		});
		
	$('.htmltabs').tabs(
	{
	    show:function(id){
		if(id=="tab1")
		{

		$("#grid").show();
		$("#graph").hide();	
		$('.tableOuterDiv').jScrollPane();		
		}
		else if(id=="tab5")
		{
		 	$('.scroll-pane3').jScrollPane();
		}
		else if(id=="tab7")
		{
		 	$('.scroll-pane2').jScrollPane();
		}
		else if(id=="tab2")
		{
			$('.tableOuterDiv_log').jScrollPane();		
		}
		
		}
	  }
	);
	$(".combo > li").hover(
				  function () {
					$(this).find(".combo-middle").addClass("combo-middle-hover");
					$(this).find(".combo-middle").removeClass("combo-middle");
					$(this).find(".combo-left").addClass("combo-left-hover");
					$(this).find(".combo-left").removeClass("combo-left");
					$(this).find(".combo-right").addClass("combo-right-hover");
					$(this).find(".combo-right").removeClass("combo-right");
				  },
				  function () {
					$(this).find(".combo-middle-hover").addClass("combo-middle");
					$(this).find(".combo-middle-hover").removeClass("combo-middle-hover");						
					$(this).find(".combo-left-hover").addClass("combo-left");
					$(this).find(".combo-left-hover").removeClass("combo-left-hover");						
					$(this).find(".combo-right-hover").addClass("combo-right");
					$(this).find(".combo-right-hover").removeClass("combo-right-hover");
				  }
		);
		
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
							var plot1 = $.EPlot($("#placeholder1"),  getRandomData1() , options,extendedOptions);
					}
				});  
		
		
	$('.scroll-pane1').jScrollPane();
	$('.scroll-pane0').jScrollPane();
	$(".combo1").combomenu({selectedValue:3});
	$("#comboTap").combomenu({isCombo:true,onOverlay:true,width: 90});
	$("#comboLoc").combomenu({isCombo:true,onOverlay:true,width: 90});
	  
	 plot = $.EPlot($("#placeholder"),  getRandomData() , options,extendedOptions);
		update();
	
	//$('.scroll-pane-overlay1').jScrollPane();
	$(".row").hover(function(){
		$(this).find("img.pen").show();
		},function(){
		$(this).find("img.pen").hide();
		});
		
		

		
		$(".analysisEditRow").hover(function(){
		$(this).find(".analysisPen").show();
		},function(){
		$(this).find(".analysisPen").hide();
		});
		
		   $("[type='textbox']").spinit(
		   {
			  height : 20, width : 100, min : 0, max : 10, stepInc : 0.01, fixedFloat : false, fontWeight: 'bold', floatLimit: 0
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
		$(dialogID).modal(
				{
					escClose:true,
					containerCss:{
						width:354}
				});	
		
	});

	$("#showOverlay").click(function() {
		var dialogID = $(this).find("a").attr("href");
		$(dialogID).modal({
			escClose:false
		});	
	});
	
	$("#compositionContainer").click(function() {

		$("#compositionOverlay").modal({
			escClose:false
		});	
	});
	
		$(".showOverlay").click(function() {
		var dialogID = $(this).find("a").attr("href");
		$(dialogID).modal({
			escClose:true
		});	
	});
	
	$(".closeLink").click(function() {
		var dialogID = $(this).attr("href");
		$.modal.close();
	});
	
	//ORIFICE OVERLAY COMBO BOX WIDTH
	$(".row1 .combo-middle").width("90px");
	$(".row1 .firstComboItem").width("115px");
	$(".row1 .lastComboItem").width("115px");
	
	$("#lnkAnaylsis").customtoggletab({width:100, primaryText:"Fixed-Analysis",
								 secondaryText:"Live-Analysis", onToggle:function(){
									$(".fixed-analysis , .live-analysis").toggle();
									
								 },
								});
	//FOR HIDING LIVE-ANALYSIS DIV 							
	$(".live-analysis").hide();
	
			
});

function adjustHeight() {
    var facHeight = $('.fac-con').height();
    var topNav = $('.top-nav').height();
    var windowHeight = 0;
    var D = document;
    windowHeight = D.body.innerHeight;
    
    var overviewSection = windowHeight - facHeight - topNav - 100;
    var noneditableOverview = Math.round(overviewSection * 0.65);
    var editableOverview = Math.round(overviewSection * 0.3);
    $('.leftOverviewContentSection').height(noneditableOverview);
    $('.leftOverviewEditableContentSection').height(editableOverview);
    var pane1api = $('.leftOverviewContentSection').data('jsp');
    var pane2api = $('.leftOverviewEditableContentSection').data('jsp');
         
                 pane1api.reinitialise();
        pane2api.reinitialise();
         if($('.leftOverviewEditableContentSection').height() >= $('.leftOverviewEditableContentSection > .jspContainer').height())
         {
                 var element = $('.scroll-pane1').jScrollPane(); 
                 var api = element.data('jsp');
                 api.destroy();
                 $('.scroll-pane1').css('overflow','hidden');
         }

    $(window).resize(function(){
        var pane1api = $('.leftOverviewContentSection').data('jsp');
        var pane2api = $('.leftOverviewEditableContentSection').data('jsp');
             
                 pane1api.reinitialise();
             pane2api.reinitialise();
             if($('.leftOverviewEditableContentSection').height() > $('.jspContainer').height())
             {
                $('.leftOverviewEditableContentSection').jScrollPaneRemove();
             }
    });

}

// $(function () {
    // we use an inline data source in the example, usually data would
    // be fetched from a server
    var data = [], totalPoints = 300;
    function getRandomData1() {
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
		var res19 = [];
		var res20 = [];
		var res21 = [];
		var res22 = [];
		var res23 = [];
		var res24 = [];
		
        for (var i = 0; i < data.length; ++i)
		{
              res.push([i*i*1000, data[i]]);
			  res2.push([i*i*1000, data[i]*( Math.random() - 10 - 5)]);
			  res3.push([i*i*1000, data[i]*( Math.random() - 8 - 2)]);
			  res4.push([i*i*1000, data[i]*( Math.random() - 20 - 15)]);
			  res5.push([i*i*1000, data[i]*( Math.random() - 30 - 15)]);
			  res6.push([i*i*1000, data[i]*( Math.random() - 40 - 15)]);
			  res7.push([i*i*1000, data[i]*( Math.random() - 50 - 15)]);
			  res8.push([i*i*1000, data[i]*( Math.random() - 60 - 15)]);
			  res9.push([i*i*1000, data[i]*( Math.random() - 70 - 15)]);
			  res10.push([i*i*1000, data[i]*( Math.random() - 80 - 15)]);
			  res11.push([i*i*1000, data[i]*( Math.random() - 90 - 15)]);
			  res12.push([i*i*1000, data[i]*( Math.random() - 100 - 15)]);
			  res13.push([i*i*1000, data[i]*( Math.random() - 110 - 15)]);
			  res14.push([i*i*1000, data[i]*( Math.random() - 120 - 15)]);
			  res15.push([i*i*1000, data[i]*( Math.random() - 130 - 15)]);
			  res16.push([i*i*1000, data[i]*( Math.random() - 140 - 15)]);
			  res17.push([i*i*1000, data[i]*( Math.random() - 150 - 15)]);
			  res18.push([i*i*1000, data[i]*( Math.random() - 160 - 15)]);
			  res19.push([i*i*1000, data[i]*( Math.random() - 170 - 15)]);
			  res20.push([i*i*1000, data[i]*( Math.random() - 180 - 15)]);
			  res21.push([i*i*1000, data[i]*( Math.random() - 190 - 15)]);
			  res22.push([i*i*1000, data[i]*( Math.random() - 200 - 15)]);
			  res23.push([i*i*1000, data[i]*( Math.random() - 210 - 15)]);
			  res24.push([i*i*1000, data[i]*( Math.random() - 220 - 15)]);
		}
		
			
			var plot=[];
			
			plot.push( {
				data : res,
				label : "SP",					
				color: "#e3660b",
				unit:"PSIA",
				display:true
			 });
			plot.push( {
				data : res2,
				label : "DP",					
				color: "#0084ff",
			    unit:"InH2o",
			    display:true
			 });
			 	plot.push( {
				data : res3,
				label : "Flow",					
				color: "#379c00",
			    unit:"SCF/Hr",
			    display:true
			 });
			 
			 	plot.push( {
				data : res4,
				label : "Temp",					
				color: "#e44eff",
				unit:"&deg;F",
			    display:true
			 });
			 
			 plot.push( {
				data : res5,
				label : "Ext",					
				color: "#008B8B",
				unit:"&deg;F",
			    display:true
			 });
			 plot.push( {
				data : res6,
				label : "Energy",					
				color: "#006400",
				unit:"&deg;F",
			    display:true
			 });
			 plot.push( {
				data : res7,
				label : "Alarms",					
				color: "#8B008B",
				unit:"&deg;F",
			    display:true
			 });
			 plot.push( {
				data : res8,
				label : "DP Min",					
				color: "#8B0000",
				unit:"InH2o",
			    display:true
			 });
			 plot.push( {
				data : res9,
				label : "DP Max",					
				color: "#E9967A",
				unit:"InH2o",
			    display:true
			 });
			 plot.push( {
				data : res10,
				label : "Dp PctLo",					
				color: "#FFD700",
				unit:"InH2o",
			    display:true
			 });
			 plot.push( {
				data : res11,
				label : "Dp PctHi",					
				color: "#ADD8E6",
				unit:"InH2o",
			    display:true
			 });
			 plot.push( {
				data : res12,
				label : "SP Min",					
				color: "#FFFFE0",
				unit:"PSIA",
			    display:true
			 });
			 plot.push( {
				data : res13,
				label : "SP Max",					
				color: "#FFC0CB",
				unit:"PSIA",
			    display:true
			 });
			 plot.push( {
				data : res14,
				label : "TF Min",					
				color: "#BDB76B",
				unit:"&deg;F",
			    display:true
			 });
			 plot.push( {
				data : res15,
				label : "TF Max",					
				color: "#BDB76B",
				unit:"SCF/Hr",
			    display:true
			 });
			 plot.push( {
				data : res16,
				label : "TF PctLo",					
				color: "#0397ea",
				unit:"SCF/Hr",
			    display:true
			 });
			 plot.push( {
				data : res17,
				label : "TF PctHi",					
				color: "#fdac26",
				unit:"SCF/Hr",
			    display:true
			 });
			 plot.push( {
				data : res18,
				label : "Contract Hr",					
				color: "#ff0000",
				unit:"&deg;F",
			    display:true
			 });
			 plot.push( {
				data : res18,
				label : "Period Time",					
				color: "#cc33ff",
				unit:"&deg;F",
			    display:true
			 });
			 plot.push( {
				data : res20,
				label : "Flow Time",					
				color: "#0033ff",
				unit:"&deg;F",
			    display:true
			 });
			 plot.push( {
				data : res21,
				label : "Back Flow",					
				color: "#c8c8c8",
				unit:"&deg;F",
			    display:true
			 });
			 plot.push( {
				data : res22,
				label : "SN",					
				color: "#B7D66E",
				unit:"&deg;F",
			    display:true
			 });
			 plot.push( {
				data : res23,
				label : "Temp1",					
				color: "#E3D3B9",
				unit:"&deg;F",
			    display:true
			 });
			 plot.push( {
				data : res24,
				label : "Temp2",					
				color: "#BEC2A9",
				unit:"&deg;F",
			    display:true
			 });
        return plot;
    }
	
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
				label : "SP",					
				color: "#e3660b",
				unit:"PSIA",
				display:true
			 });
			plot.push( {
				data : res2,
				label : "DP",					
				color: "#0084ff",
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
			 
			 	plot.push( {
				data : res4,
				label : "Temp",					
				color: "#e44eff",
				  unit:"&deg;F",
			
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
              seriesLimit:4
              }
			  
   
	
	
    function update() {
        plot.setData( getRandomData() );
        plot.draw(); 
		// plot1.setData( getRandomData() );
        // plot1.draw(); 
		
        setTimeout(update, updateInterval);
    }

	function showHideEditPenImage(selector,editPenSelector)
	{
		$(selector).hover(function(){
			$(this).find(editPenSelector).show();
			},function(){
			$(this).find(editPenSelector).hide();
			});
	}
	
// });