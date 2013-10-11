var i=100, per=2;
var mins,secs,TimerRunning,TimerID;
TimerRunning=false;

$(document).ready(function() 
	{
	document.f.pic.value='';
	$(".up_btn").click(function() {
		
		var dialogID = $(this).find("a").attr("href");
		$(dialogID).modal(
				{
					escClose:true,
					containerCss:{
						width:354,
						height:165
						}
				});	
		
	});
	$(".up_clk").click(function() 
		{
		$(".up_error_row").hide();
		var ext = document.f.pic.value;
		ext = ext.substring(ext.length-3,ext.length);
		ext = ext.toLowerCase();
   
		if(ext != 'xfc') {
			$(".up_error_row").show();	
			document.f.pic.value='';
			return false;
			}
		else
			{ 
			i=100;
			per=2;
			$(".save-btn").hide();
			$(".cancel-btn").hide();
			$(".up_row").hide();
			$(".progress-bar-main").show();
			$(".abort-btn").show();
			Init();
			}
		});
	$(".abort-btn").click(function() 
		{
		StopTimer();
		$(".done-btn").hide();
		$(".abort-btn").hide();
		$(".save-btn").show();
		$(".cancel-btn").show();
		$(".up_row").show();
		$(".progress-bar-main").hide();
		});	  
	$(".done-btn").click(function() 
		{
		$(".abort-btn").hide();
		$(".save-btn").show();
		$(".cancel-btn").show();
		$(".up_row").show();
		$(".progress-bar-main").hide();
		$(".abort-btn").hide();
		$(".done-btn").hide();
		});
	});
	
function Init() //call the Init function when u need to start the timer
	{
	secs=20;
	StopTimer();
	StartTimer();
	}
function StopTimer()
	{
	if(TimerRunning)
       clearTimeout(TimerID);
    TimerRunning=false;
	}
 
function StartTimer()
	{
	TimerRunning=true;
	TimerID=self.setTimeout("StartTimer()",100);
	if(secs%2==0)
		{
		$(".progress-bar-sub").width(i);
		$(".status").html(per + "&#37;");
		}
	i=i+12;
	per=per+4;
	if(secs==0)
		{
		$(".progress-bar-sub").width(334);
		$(".status").html(100 + "&#37;");
		$(".abort-btn").hide();
		$(".done-btn").show();
		StopTimer();
		}
    secs--;
	}


