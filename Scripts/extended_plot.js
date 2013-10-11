
// the actual Flot code
(function($) {
     function extendPlot(placeholder,extOptions,plot) {
	      var extendedOptions ={
                          selectableSeries:true,
			              showToolTip:true,
                          seriesLimit:null}
          var placeholder=placeholder;
		  var plot=plot;
		  var seriesID=placeholder.attr("id")+'Series';
		  var previousPoint = null;
		  var checkedImage="checkbox-black-selected.png";
		  var unCheckedImage="checkbox-black-normal.png";
          var disabledCheckedImage="checkbox-blackbg-normal-disabled.png";
		  var path="images/";
		  var  series=plot.getData();
		  var uncheckedState=0;
	      var checkedState=1;
		  var disabledState=-1;
		  parseOptions(extOptions);				
		  function parseOptions(opts)
		  {
		     $.extend(true, extendedOptions, opts);
		  }
		  
		  this.extendChart = function()
		  {
				if(extendedOptions.selectableSeries)
				{
				   renderSelectableSeries();
				}
				if(extendedOptions.showToolTip)
				{
				   bindCustomToolTip();
				}
		  }	
		      
		  function bindCustomToolTip()
		  {
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
					 padding: '10px',
					"background-color": color,
					"color":"#fff",
				    "font-weight": "bold",
					 opacity: 0.80
				}).appendTo("body").fadeIn(200);
			}
			
			function convertEpochToDate(seconds)
			{
			    var date = new Date( seconds *1000);
				var monthNames = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				return $.plot.formatDate(date, "%b  %d,%y  %H:%M:%S", monthNames);
			}
			
			function createToolTip(contents)
			{
			 	var time = contents.datapoint[0].toFixed(2),
				value = contents.datapoint[1].toFixed(2);
			        var unit=   contents.series.unit==null?"":contents.series.unit;
				var toolTip="";
				toolTip +=" <div class='graphToolTipTop'><span>"+convertEpochToDate(time)+"</span> </div>   "  ;
				toolTip +=" <div class='graphToolTipBottom'><span class='tooltipValue' >"+value+"</span> <span> "+unit+"</span>	</div>	   "  ;
                return toolTip;
			}
	
		  function renderSelectableSeries()
		  {
		       $("#"+seriesID).remove();
		        jQuery('<div/>', {
					id: seriesID,
					"class":"graphSeries"
				}).css({
				      					  
						 }).insertAfter(placeholder);

		         var  series=plot.getData();
				 var html="";
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
						
					html +=" <div style='display:inline-block;'> ";
					html += "<div><img  name='"+sl+"' src='"+path+img+"' check='"+state+"' id='img"+sl+"' >";
					html +=" <span class='T9' for='img"+sl+"'>"+sl+" ("+su+")"+"</span>     ";
					html += "<div class='graphLegend' style='background-color:"+sc+";height:"+3+"px;'>   </div></div>	</div>  ";
				}			
	            $("#"+seriesID).html("");				
				$("#"+seriesID).append(html);
				bindSeriesCheckbox();
				replotGraph();
				
		  }
		  
		  
		  function bindSeriesCheckbox()
		  {
		  		$("#"+seriesID).find("img").each(function () {
			        $(this).bind("click", function (event, pos, item) {
								if($(this).attr("check")==disabledState){
								   return false;
								}
								var img=   $(this).attr("check")==checkedState?unCheckedImage:checkedImage;
                                var state= $(this).attr("check")==checkedState?uncheckedState:checkedState;
								$(this).attr("src",path+img);
								$(this).attr("check",state);
								var legendContainer=$("#"+seriesID);
								var selectedSeries=legendContainer.find("[src='"+path+checkedImage +"']").size();
								if(extendedOptions.seriesLimit ){
										if(selectedSeries<extendedOptions.seriesLimit){
										  var lstDisabled=legendContainer.find("[check='"+disabledState+"']");
										  lstDisabled.attr("src",path+unCheckedImage);
										  lstDisabled.attr("check",uncheckedState);
										}
										else
										{
											var lstUnchecked=legendContainer.find("[check='"+uncheckedState+"']");
											lstUnchecked.attr("src",path+disabledCheckedImage);
											lstUnchecked.attr("check",disabledState);
										}
								}
                                      replotGraph();							
								} );
				});
		  }
		  
		  
		  function replotGraph()
		  {
				var data=[];
			    if(extendedOptions.selectableSeries)
				{
					$("#"+seriesID).find("[check='"+checkedState+"']").each(function () {
					var key = $(this).attr("name");			
					data.push(findSeries(series,key));
				    });
				}
				else
				{
				  data=series;
				}
		        plot.setData(data);
			//	plot.setupGrid();
				plot.draw();  		  
		  }
		  
		this.setData = function(data) {
		      plot.setData(data);
			  series=plot.getData();
		}
           
		this.draw = function() {
		      replotGraph();
		}
		
		function findSeries(array,ID){
			return $.grep(array, function(item){
			  return item.label == ID;
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

