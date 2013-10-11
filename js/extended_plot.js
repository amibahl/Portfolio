
// the actual Flot code
(function($) {
     function extendPlot(placeholder,extOptions,plot) {
	      var extendedOptions ={
                          selectableSeries:true,
			              showToolTip:true,
                          seriesLimit:null,
						  setUpGrid:false,
						  setMultipleAxis:false,
						  maxLegendCount:4,
						  fileName:"02W02TP"}
						  
          var placeholder=placeholder;
		  var plot=plot;
		  var seriesID=placeholder.attr("id")+'Series';
		  var overlayID=seriesID+"Overlay";
		  var overlayContainerID=seriesID+"OverlayContainer";
		  var expandID=seriesID+"Expand";
		  var previousPoint = null;
		  var checkedImage="checkbox-black-selected.png";
		  var unCheckedImage="checkbox-black-normal.png";
          var disabledCheckedImage="checkbox-blackbg-normal-disabled.png";
		  var path="images/";
		  var series=plot.getData();
		  var uncheckedState=0;
	      var checkedState=1;
		  var disabledState=-1;
		  var checkAttribute="check";
		  parseOptions(extOptions);				
		  function parseOptions(opts){
		     $.extend(true, extendedOptions, opts);
		  }
		  
		  this.extendChart = function(){
				if(extendedOptions.selectableSeries)
				{
				   renderSelectableSeries();
				}
				if(extendedOptions.showToolTip)
				{
				   bindCustomToolTip();
				}
		  }	
		      
		  function bindCustomToolTip(){
		         placeholder.bind("plothover", function (event, pos, item) {
				  if (item) {
						if (previousPoint != item.dataIndex) {
							previousPoint = item.dataIndex;
							$("#tooltip").remove();				
							showTooltip(item.pageX, item.pageY,
											item);				 
						}
				}
				else {
					$("#tooltip").remove();
					previousPoint = null;            
				}				
					
				});
		  }
		  
		      function showTooltip(x, y, contents) {
			    var color=   contents.series.color;
				var label=   contents.series.label;		
				$('<div id="tooltip" class="graphToolTip">' + createToolTip(contents) + '</div>').css( {
					 position: 'absolute',
					 display: 'none',
					 top: y + 5,
					 left: x + 5,
					 padding: '5px',
					"background-color": color,
					"color":"#fff",
				    "font-weight": "bold",
					 opacity: 1.0
				}).appendTo("body").fadeIn(200);
			}
			
			function convertEpochToDate(seconds){
			    var date = new Date( seconds *1000);
				var monthNames = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				return $.plot.formatDate(date, "%b  %d,%y  %H:%M:%S", monthNames);
			}
			
			function createToolTip(contents){
			 	var time = contents.datapoint[0].toFixed(2),
				value = contents.datapoint[1].toFixed(2);
			    var unit=   contents.series.unit==null?"":contents.series.unit;
				var toolTip="";
				toolTip +=" <div class='graphToolTipTop'><span>"+convertEpochToDate(time)+"</span> </div>   "  ;
				toolTip +=" <div class='graphToolTipBottom'><span class='tooltipValue' >"+value+"</span> <span> "+unit+"</span>	</div>	   "  ;
                return toolTip;
			}
	
		  function renderSelectableSeries(){
		     $("#"+seriesID).remove();
		       var seriesContainer= $('<div/>', {
					"class":"graph-series-container"
				});
				seriesContainer.insertAfter(placeholder);				
                var seriesBox=$('<div/>', {
					id: seriesID,
					"class":"graphSeries"
				});
				
		         var  series=plot.getData();
				// var html="";
		         $("#"+seriesID).html("");	
                 var plotCount=0;
				 for (i = 0; i < series.length; ++i) {
					var sc = series[i].color;
					var sl = series[i].label;
				    var su=   series[i].unit==null?"":series[i].unit;
					var display=   series[i].display==null?true:series[i].display;
					var state=uncheckedState;
					if(display){
						plotCount++;
						state=checkedState;
					}
                    var img= display==true?checkedImage:unCheckedImage;
                    if(extendedOptions.seriesLimit && plotCount>extendedOptions.seriesLimit){
                        display=false;
					    state=disabledState;
						img=disabledCheckedImage;
					}
					
					var legendBox	=$('<div/>', {
									"class":"graphLegend" 
								    });
									
					var legendId=seriesID+i;
				    $.extend(true, series[i], {ID:legendId});
					var legendImage	=$('<img/>', {
										 id:"img"+legendId,
										 src:path+img,
										 name:legendId
									 }).attr(checkAttribute,state);	
				
					var legendText	=$('<span/>', {
										"class":'T9',
										 "for":"img"+sl,
										  name:"spn"+legendId
									}).html(sl+"("+su+")");	
				
					var legendBackground	=$('<div/>', {
												"class":"graphLegend" 
											}).css({
												"background-color":sc,
												"height":"3px"				
											});		
							
					
					legendBox.append(legendImage);
					legendBox.append(legendText);
					legendBox.append(legendBackground);
					seriesBox.append(legendBox);
					if(i>=extendedOptions.maxLegendCount){
					  legendBox.hide();
					}					
				}			
                seriesContainer.append(seriesBox);
				if(series.length>extendedOptions.maxLegendCount){
					$("#"+expandID).remove();
					$('<div/>', {
						id: expandID,
						"class":"graph-expand"
					}).html("Options>>").insertAfter(seriesBox);
			
					$("#"+expandID).bind("click", function () {
						 showOverlay();
					  });					  
				}
				  
				bindSeriesCheckbox();
				replotGraph();
				createOverlayContainer();
		  }
		  
		  function showOverlay(){            
		    setOverlayLegend();
		    $("#"+overlayID).modal({
						escClose:false,
						persist :true,
						containerCss:{
								    	width:640,
										height:'auto'
									 }
								//	 ,
						//onClose: function (dialog) {
					       //restoreLegend(); 
						//	}
					});		
		  }
		  
		  function createOverlayContainer(){
		    
			var overlayBox	=$('<div/>', {
					 id: overlayID,
					"class":"overlayBox" 
				});
				
			var overlayHeader	=$('<div/>', {
				"class":"overlay-header T3" 
			}).html("Select Series - "+extendedOptions.fileName);		
					
			var overlayContainer	=$('<div/>', {
				"class":"container graph-container" ,
				id:overlayContainerID
			}).css({
			   "min-height":"100px"
			});
			
			var overlayFooter	=$('<div/>', {
				"class":"overlay-footer" 
			}).html("<div class='cancel-btn closeLink'><a href='#' class='T9'>Close</a></div>");
			
			
			overlayBox.append(overlayHeader);
			overlayBox.append(overlayContainer);
			overlayBox.append(overlayFooter);
			overlayBox.insertAfter(placeholder);
			
			  $(".closeLink").click(function() {         
					$.modal.close();
					restoreLegend();
					
				});
		  }
		  
		   function setOverlayLegend(){
		    var legendContainer=$("#"+seriesID);
			//$("#"+seriesID).remove();
		    checkedImage="checkbox-white-selected.png";
		    unCheckedImage="checkbox-white-normal.png";
            disabledCheckedImage="checkbox-white-normal-disabled.png";
			legendContainer.find("["+checkAttribute+"='"+uncheckedState+"']").attr("src",path+unCheckedImage);
			legendContainer.find("["+checkAttribute+"='"+checkedState+"']").attr("src",path+checkedImage);
			legendContainer.find("["+checkAttribute+"='"+disabledState+"']").attr("src",path+disabledCheckedImage);		 
			$("#"+overlayContainerID).append(legendContainer);
			legendContainer.find(".graphLegend").show();
			//bindSeriesCheckbox();
		  }
		  
		  function restoreLegend(){
			var legendContainer=$("#"+seriesID);
		    checkedImage="checkbox-black-selected.png";
		    unCheckedImage="checkbox-black-normal.png";
            disabledCheckedImage="checkbox-blackbg-normal-disabled.png";
			legendContainer.find("["+checkAttribute+"='"+uncheckedState+"']").attr("src",path+unCheckedImage);
			legendContainer.find("["+checkAttribute+"='"+checkedState+"']").attr("src",path+checkedImage);
			legendContainer.find("["+checkAttribute+"='"+disabledState+"']").attr("src",path+disabledCheckedImage);
			legendContainer.find("["+checkAttribute+"]").parent().hide();
		    var lstChecked=legendContainer.find("["+checkAttribute+"='"+checkedState+"']:lt("+parseInt(extendedOptions.maxLegendCount)+")");	
            lstChecked.parent().show();
			if(lstChecked.length<extendedOptions.maxLegendCount){
			  legendContainer.find("["+checkAttribute+"='"+uncheckedState+"']:lt("+parseInt(extendedOptions.maxLegendCount-lstChecked.length)+")")
			  .parent().show();				
			}
		    legendContainer.insertBefore(  $("#"+expandID) );
			//bindSeriesCheckbox();
		  }
		  
		  function bindSeriesCheckbox(){
		       var legendContainer=$("#"+seriesID);
		  		$("#"+seriesID).find("img").each(function () {
				    $(this).unbind('click');
			        $(this).bind("click", function (event, pos, item) {
								if($(this).attr(checkAttribute)==disabledState){
								   return false;
								}
								var img=   $(this).attr(checkAttribute)==checkedState?unCheckedImage:checkedImage;
                                var state= $(this).attr(checkAttribute)==checkedState?uncheckedState:checkedState;
								$(this).attr("src",path+img);
								$(this).attr(checkAttribute,state);
							    validateSeriesLimit();
							    hideLegend();
                                replotGraph();							
								} );
				});
				validateSeriesLimit();
				hideLegend();
		  }
		  
		  function validateSeriesLimit(legendContainer){
		       var legendContainer=$("#"+seriesID);
		    	var selectedSeries=legendContainer.find("["+checkAttribute+"='"+checkedState+"']").size();
				if(extendedOptions.seriesLimit ){
						if(selectedSeries<extendedOptions.seriesLimit){
						  var lstDisabled=legendContainer.find("["+checkAttribute+"='"+disabledState+"']");
						  lstDisabled.attr("src",path+unCheckedImage);
						  lstDisabled.attr(checkAttribute,uncheckedState);
						}
						else
						{
							var lstUnchecked=legendContainer.find("["+checkAttribute+"='"+uncheckedState+"']");
							lstUnchecked.attr("src",path+disabledCheckedImage);
							lstUnchecked.attr(checkAttribute,disabledState);
						}			 
				}
		  }
		  
		  function hideLegend(legendContainer){
		    var legendContainer=$("#"+seriesID);
		     legendContainer.find(".graphLegend").css("visibility","visible");
			 legendContainer.find("["+checkAttribute+"='"+disabledState+"']").parent().find(".graphLegend").css("visibility","hidden");
			 legendContainer.find("["+checkAttribute+"='"+checkedState+"']").parent().find(".graphLegend").css("visibility","visible");                              
		  }
		  
		  function replotGraph(){
				var data=[];
				var i=0;
			   	if(extendedOptions.selectableSeries){
					var lst=$("#"+seriesID).find("["+checkAttribute+"='"+checkedState+"']");
					for(var k=0;k< lst.length;k++){
                       var key = $(lst[k]).attr("name");	
						var obj=findSeries(series,key);	
						if(obj){
								 i=i+1;		
								  if(extendedOptions.setMultipleAxis){
									 $.extend(true, obj, {yaxis:i});
								  }								
								 data.push(obj);}
						}						
				}
				else
				{
				  data=series;
				}
		        plot.setData(data);
				if(extendedOptions.setUpGrid || extendedOptions.setMultipleAxis){
				   plot.setupGrid();
				}
				if(extendedOptions.setMultipleAxis){
                setYAxisColor();}	
	            plot.draw(); 				
		  }
		  
		 function setYAxisColor(){
				var i=0;
				$("#"+seriesID).find("["+checkAttribute+"='"+checkedState+"']").each(function () {
					var key = $(this).attr("name");	
					var obj=findSeries(series,key);
					if(obj){
					  i=i+1;
					  $(placeholder).find(".y"+i+"Axis").css("color",obj.color);					
					}
					data.push();
				});
					  
		  }
		  
		this.setData = function(data) {
			  $.extend(true, series, data);		      
		      plot.setData(series);
			  series=plot.getData();
		}
           
		this.draw = function() {
		      replotGraph();
		}
		
		function findSeries(array,ID){
			return $.grep(array, function(item){
			  return item.ID == ID;
				})[0];
			};
	}

	$.EPlot = function(placeholder, data, options,extendedOptions) {
        var plot=$.plot(placeholder,  data , options);
        var ePlot = new extendPlot(placeholder,extendedOptions,plot);
		ePlot.extendChart();
        return ePlot;
    };
      
    
})(jQuery);

