$(function() {
	$("#lstCalibrationType").combomenu({			
		width: "150px",
        isCombo: true,
        indexChanged: function(menuItem) {
            var text = menuItem.find("a").html();
            var tableRows = $("#calibrationOptions .tableRow");
            tableRows.eq(0).css({display: "none"});
            tableRows.eq(1).css({display: "none"});
            tableRows.eq(2).css({display: "none"});
            
            switch($.trim(text).toLowerCase()) {                    
                case "static pressure":
                    tableRows.eq(0).css({display: "block", opacity: 0}).animate({opacity: 1}, null, null, function() {
                            $(this).show();
                        });
                    tableRows.eq(1).css({display: "block", opacity: 0}).animate({opacity: 1}, null, null, function() {
                            $(this).show();
                        });
                    break;
                case "temperature/rtd":
                    tableRows.eq(2).css({display: "block", opacity: 0}).animate({opacity: 1}, null, null, function() {
                            $(this).show();
                        });
                    break;
            }
        }
	});
		
	$(".calibrationTabs").tabs();

	// Change image on click of radio.
	$(".radio").click(function() {
		$(this).toggleClass("radio-active");
	});

	
	
	function initializeBreadcrumb() {
		$(".overlayNavigation:visible li:first").removeClass("activecrumb1").removeClass("activecrumb2").removeClass("crumb");
		$(".overlayNavigation:visible li:first").addClass("overlayNavigationActive");
		$(".overlayNavigation:visible li:first").next().addClass("activecrumb2");
		$("#calibrationCalibrateContent").hide();
		$("#calibrationVerify").hide();
		$("#calibrationFinish").hide();
	}		
	
	function gotoNextStep() {
		var currentElement = $(".overlayNavigation:visible").find("li.overlayNavigationActive");
		var nextElement = currentElement.next();
		
		if(nextElement.is("li")) {
			currentElement.removeClass("overlayNavigationActive activecrumb1 activecrumb2");
			if(currentElement.index() != 0 && (currentElement % 3 != 0)) currentElement.addClass("crumb");
			nextElement.removeClass("activecrumb1 activecrumb2");
			nextElement.removeClass("crumb").addClass("activecrumb1");		
			nextElement.addClass("overlayNavigationActive");
			nextElement.next().addClass("activecrumb2");			
		}
	}
	
	function goToPreviousStep() {
		var currentElement = $(".overlayNavigation:visible").find("li.overlayNavigationActive");
		currentElement.removeClass("overlayNavigationActive");
		currentElement.next().removeClass("activecrumb1").removeClass("activecrumb2");
		var prevElement = currentElement.prev();
		
		
		if(prevElement.is("li")) {
			prevElement.removeClass("overlayNavigationActive activecrumb1 activecrumb2");
			if(prevElement.index() != 0) currentElement.addClass("crumb");
			prevElement.removeClass("activecrumb1 activecrumb2");
			prevElement.removeClass("crumb").addClass("activecrumb1");		
			prevElement.addClass("overlayNavigationActive");
			prevElement.next().addClass("activecrumb2");			
		}
	}

	function goToFinishStep() {
		var currentElement = $(".overlayNavigation:visible").find("li.overlayNavigationActive");
		var nextElement = currentElement.siblings().eq(2);

		if(nextElement.is("li")) {
			currentElement.removeClass("overlayNavigationActive activecrumb1 activecrumb2");			
			currentElement.next().removeClass("activecrumb2");
			nextElement.removeClass("activecrumb1 activecrumb2");
			nextElement.removeClass("crumb").addClass("activecrumb1");		
			nextElement.addClass("overlayNavigationActive");
			nextElement.next().addClass("activecrumb2");			
		}
	}	

	function removeBreadcrumbHighlight() {
		var currentElement = $(".overlayNavigation:visible").find("li.overlayNavigationActive");
		currentElement.removeClass("overlayNavigationActive");
		currentElement.removeClass("activecrumb1").removeClass("activecrumb2").addClass("crumb");
		if(currentElement.index() != 3) currentElement.next().removeClass("activecrumb2");		
	}
	
	function displayVerify() {
		$("#txtCalibrationVerify").unbind("keydown");
		$("#txtCalibrationVerify").val("");
		$("#btnContinue").hide();
		$("#btnRezero").hide();
		$("#btnRecalibrate").show();
		$("#btnAcceptAndContinue").show();		
		$("#calibrationCalibrateContent").hide();
		$("#btnAcceptAndContinue").unbind("click").removeClass("calibrationButton").addClass("calibrationDisabledButton");
		$("#btnRecalibrate").unbind("click").removeClass("calibrationButton").addClass("calibrationDisabledButton");
		gotoNextStep();
		$("#calibrationVerify").show().css({opacity: 0}).animate({opacity: 1});
		$("#calibrationVerify .calibrationRows div").removeClass("rowHighlight");
		$("#calibrationVerify .calibrationRows div:first").addClass("rowHighlight");

		// If the calibration type is "Static Pressure", then add 14.73 to the live value.
		if($("#lstCalibrationType").find("div.combo-middle a").html() === "Static Pressure") {
			$(".liveHeaderValue").html(parseInt(146.20) + 14.73);
		}
		
		window.leftRows = [
			[window.foundRows[0][0], "", "2.99%"],
			[window.foundRows[1][0], "", "3.49%"],
			[window.foundRows[2][0], "", "1.80%"],
			[window.foundRows[3][0], "", "5.60%"],
			[window.foundRows[4][0], "", "12.89%"]
		];		
		
		for(var x = 0; x < leftRows.length; x++) {						
			var currentRow = $("#calibrationVerify .calibrationRows > div:eq(" + x + ")");
			currentRow.find("div.testValue").html(leftRows[x][0]).addClass("initialFound");
			currentRow.find("div.liveValue").html("&nbsp;");
			currentRow.find("div.diffValue").html("&nbsp;");
		}
		
		$("#txtCalibrationVerify").focus();

		$(".userInputStatus").unbind("click").click(function() {
			addVerificationRow();

			if(i == 5) {				
				i = 0;
				$("#btnAcceptAndContinue").removeClass("calibrationDisabledButton").addClass("calibrationButton");
				$("#btnRecalibrate").removeClass("calibrationDisabledButton").addClass("calibrationButton");
				// click event of "Accept and Continue" button.
				$("#btnAcceptAndContinue").click(function() {		
					gotoNextStep();		
					$(this).hide();
					$("#calibrationVerify").hide();
					$("#calibrationFinish").show().css({opacity: 0}).animate({opacity: 1});
					$("#btnRecalibrate").hide();
					$("#btnAddToReportAndFinish").show();

					var finishRow;

					$(".asFound .finishRows").html("");
					$(".asLeft .finishRows").html("");

					for(z = 0; z < window.foundRows.length; z++) {
						finishRow = $("<div></div>").addClass("finishRow");			
						$("<div></div>").addClass("T12").html(window.foundRows[z][0]).appendTo(finishRow);
						$("<div></div>").addClass("T12").html(window.foundRows[z][1]).appendTo(finishRow);
						$("<div></div>").addClass("T7b").html(window.foundRows[z][2]).appendTo(finishRow);
						finishRow.appendTo($(".asFound .finishRows"));
						

						finishRow = $("<div></div>").addClass("finishRow");			
						$("<div></div>").addClass("T12").html(window.leftRows[z][0]).appendTo(finishRow);
						$("<div></div>").addClass("T12").html(window.leftRows[z][1]).appendTo(finishRow);
						$("<div></div>").addClass("T12").html(window.leftRows[z][2]).appendTo(finishRow);
						finishRow.appendTo($(".asLeft .finishRows"));			
					}	
				});	

				// click event fo "re-calibrate" button.
				$("#btnRecalibrate").click(function() {
					goToPreviousStep();
					$("#calibrationVerify").hide();
					$("#btnContinue").show();
					$("#btnContinue").unbind("click");
					$("#btnContinue").click(displayVerify);
					$("#btnRezero").show();
					$("#btnRezero").unbind("click");
					$("#btnAcceptAndContinue").hide();		
					$(this).hide();		
					displayCalibrate();
				});
			}
		});	
		

		function addVerificationRow() {			
			if(($.trim($("#txtCalibrationVerify").val()) != "") && (!isNaN($("#txtCalibrationVerify").val()))) {
				$("#calibrationVerify .calibrationRows div.rowHighlight").removeClass("rowHighlight");
				var currentRow = $("#calibrationVerify .calibrationRows > div:eq(" + i + ")");
				currentRow.find("div.testValue").removeClass("initialFound").html($("#txtCalibrationVerify").val());
				window.leftRows[i][0] = $("#txtCalibrationVerify").val();
				if(i == 0) {
					currentRow.find("div.diffValue").removeClass("T7b").addClass("T12b");
				}							
				window.leftRows[i][1] = $(".liveHeaderValue").html();
				currentRow.find("div.liveValue").html($(".liveHeaderValue").html());
				currentRow.find("div.diffValue").html(leftRows[i][2]);
				currentRow.find("div:last").html("&nbsp");
				currentRow.css({opacity: 0}).animate({opacity: 1});
				currentRow.next().addClass("rowHighlight");
				$("#txtCalibrationVerify").val("");
				$("#txtCalibrationVerify").focus();			
				i++;
			}
		}

		i = 0;
		$("#txtCalibrationVerify").bind("keydown", function(event) {
			if(i != 0) {
				$(".calibrationDiff").removeClass("T1b").addClass("T7b");
			}
			
			$(".calibrationDiff").html(leftRows[i][2]);
			if(event.which == 13) {
				addVerificationRow();
			}	

			if(i == 5) {				
				i = 0;
				$("#btnAcceptAndContinue").removeClass("calibrationDisabledButton").addClass("calibrationButton");
				$("#btnRecalibrate").removeClass("calibrationDisabledButton").addClass("calibrationButton");

				// click event fo "re-calibrate" button.
				$("#btnRecalibrate").click(function() {
					goToPreviousStep();
					$("#calibrationVerify").hide();
					$("#btnContinue").show();
					$("#btnContinue").unbind("click");
					$("#btnContinue").click(displayVerify);
					$("#btnRezero").show();
					$("#btnRezero").unbind("click");
					$("#btnAcceptAndContinue").hide();		
					$(this).hide();		
					displayCalibrate();
				});

				// click event of "Accept and Continue" button.
				$("#btnAcceptAndContinue").click(function() {		
					gotoNextStep();		
					$(this).hide();
					$("#calibrationVerify").hide();
					$("#calibrationFinish").show().css({opacity: 0}).animate({opacity: 1});
					$("#btnRecalibrate").hide();
					$("#btnAddToReportAndFinish").show();

					var finishRow;

					$(".asFound .finishRows").html("");
					$(".asLeft .finishRows").html("");

					for(z = 0; z < window.foundRows.length; z++) {
						finishRow = $("<div></div>").addClass("finishRow");			
						$("<div></div>").addClass("T12").html(window.foundRows[z][0]).appendTo(finishRow);
						$("<div></div>").addClass("T12").html(window.foundRows[z][1]).appendTo(finishRow);
						$("<div></div>").addClass("T7b").html(window.foundRows[z][2]).appendTo(finishRow);
						finishRow.appendTo($(".asFound .finishRows"));
						

						finishRow = $("<div></div>").addClass("finishRow");			
						$("<div></div>").addClass("T12").html(window.leftRows[z][0]).appendTo(finishRow);
						$("<div></div>").addClass("T12").html(window.leftRows[z][1]).appendTo(finishRow);
						$("<div></div>").addClass("T12").html(window.leftRows[z][2]).appendTo(finishRow);
						finishRow.appendTo($(".asLeft .finishRows"));			
					}	
				});	
			}
		});						
	}
	
	function displayCalibrate() {		
		$("#calibrationCheckContent").hide();
		$("#calibrationCalibrateContent").show().css({opacity: 0}).animate({opacity: 1});				
		$("#btnAcceptAndFinish").hide();
		$(".calibrationCalibrateTabs").tabs({
			show: function(id) {
				$("#btnRezero").show();
				$("#btnRezero").unbind("click");
				$("#btnRezero").click(displayVerify);				
				 
				if(id == "calibTab3Point") {					
					if($.trim($("#calibration3PointCanvas").html()) == "") {						
						applyGraph("calibration3PointCanvas", $("#calibration3PointCanvas").width(), $("#calibration3PointCanvas").height());						
					}					
					$("#calibTab3Point").css({opacity: 0}).animate({opacity: 1}, null, null, function() {
						// Change image on click of checkbox.
										
					});					
					$("#btnContinue").show();					
					$("#btnRezero").hide();
					$(".checkbox").unbind("click").click(function() {
						$(this).toggleClass("checkbox-active");
					});	
				}
				else if(id == "calibTabRezero1") {					
					$("#calibTabRezero1").css({opacity: 0}).animate({opacity: 1}, null, null, function() {						
						$("#txtRezeroTest1").val("");
					});					
					$("#txtRezeroTest1").focus();
					$("#btnContinue").hide();					
					$("#btnRezero").show();					
					$("#txtRezeroTest1").val("");
				}							
			}
		});				
	}	
	
	function applyGraph(id, width, height) {
		var paper = new Raphael(document.getElementById(id), width, height);
		var pointCalibration = 3;
        var left = 0;
        var top = 0;
        var boxSize = parseInt((240 / pointCalibration), 10);                           
        
        for(var i = 0; i < pointCalibration; i++) {
            left = 0;
            for(var j = 0; j < pointCalibration; j++) {
                var rect = paper.rect(left, top, boxSize, boxSize);
                rect.attr({stroke: "#999999", "stroke-width": "0.7"});
                if(i == 2 && j == 0) {
                    rect.attr({fill: "#a0a0a0"});
                }
                if((i == 1 && j == 0) || (i == 1 && j == 1) || (i == 2 && j == 1)) {
                    rect.attr({fill: "#646464"});
                }
                if(i == 0 || j == 2) {
                    rect.attr({fill: "#444444"});
                }                
                left += boxSize;
            }
            top += boxSize;
        }
        var whiteLine = paper.path("M 0 240 l 240 -240");
        whiteLine.attr({stroke: "#fff", "stroke-width": "1"});
        
        var circle = paper.circle(40, 180, 4);
        circle.attr({stroke: "#000", fill: "#000"});
        
        circle = paper.circle(60, 120, 4);
        circle.attr({stroke: "#000", fill: "red"});
        
        circle = paper.circle(140, 88, 4);
        circle.attr({stroke: "#000", fill: "#000"});                
        
        circle = paper.circle(160, 18, 4);
        circle.attr({stroke: "#000", fill: "#b3b3b3"});
        
        circle = paper.circle(220, 5, 4);
        circle.attr({stroke: "#000", fill: "#b3b3b3"});
		
		var curve = paper.path("M 0 240 L 40 180 60 120 140 88 160 18 220 5");
		curve.attr({stroke: "Red"});
		
		var lowPointText = paper.text(10, 250, "LOW");
		var mediumPointText = paper.text(100, 250, "MEDIUM");
		var highPointText = paper.text(170, 250, "HIGH");
	}		

	// display edit image on row hover
	$(".tableRow").hover(function() {
		$(this).find(".edit").show();
	}, function() {
		$(this).find(".edit").hide();
	});		

	function createDPSPRow() {
		var dpspRow = $("<div></div>").addClass("dpspRow");
		$("<div class='dpValue'></div>").addClass("T12").html("&nbsp;").appendTo(dpspRow);
		$("<div class='spValue'></div>").addClass("T12").html("&nbsp;").appendTo(dpspRow);
		var imgDiv = $("<div class='img'>&nbsp;</div>");		
		imgDiv.appendTo(dpspRow);
		dpspRow.appendTo($(".dpspRows"));
	}
	
	// show dialog on click of start calibration button.	
	$("#btnStartCalibration").click(function() {	

		var calibrationType = $("#lstCalibrationType .combo-middle > a").text().toUpperCase();
		switch(calibrationType) {
			case "DIFFERENTIAL PRESSURE":
				calibrationType = "DP";
				break;
			case "STATIC PRESSURE":
				calibrationType = "SP";
				break;			
		}
		$("#spCalibrationType").text(calibrationType);

		if(calibrationType == "DP-SP CHECK") {
			$("#calibrationOverlay").modal({
				containerCss: {
					width: 460,
					height: 590
				}
			});
			$("#calibrationOverlay").css({width: 460, height: 590});
			$("#calibrationFooter").css("width", 460);
			$("#calibrationCheckContent").hide();
			$("#calibrationCalibrateContent").hide();
			$("#calibrationVerify").hide();
			$("#otherCalibTypeNav").hide();
			$("#calibrationFinish").hide();
			$("#btnContinue").hide();
			$("#dpspCalibTypeNav").show();		
			$("#dpspCheckContent").show().css({opacity: 0}).animate({opacity: 1});	

			$(".dpspTabs").tabs({
				show: function(id) {
					if(id == "dpspCheck") {					
						$("#dpspCheck").css({opacity: 0}).animate({opacity: 1});				
						$("#btnRezeroAndVerify").hide();
					}
					else if(id == "dpspRezero") {
						$("#txtRezeroTest").val("");
						$("#txtRezeroTest").focus();
						$("#dpspRezero").css({opacity: 0}).animate({opacity: 1});					
						$("#btnAcceptAndFinish").removeClass("calibrationDisabledButton").addClass("calibrationButton");
						$("#btnRezeroAndVerify").show();
						
						$("#btnAcceptAndFinish").unbind("click").click(function() {
								window.clearInterval(window.dpspInterval);								

								gotoNextStep();		
								$(this).hide();
								$("#dpspCheckContent").hide();
								$("#calibrationCheckContent").hide();
								$("#calibrationFinish").show().css({opacity: 0}).animate({opacity: 1});						
								$("#btnAddToReportAndFinish").show();
								$(".finishContent").css("height", 460);
								$(".asLeft").css("float", "right");
								$(".finishHeading").css("width", 180);

								$(".asFound .finishRows").html("");
								$(".asLeft .finishRows").html("");							

								var finishRow;
								for(var i = 0; i < window.dpspFoundValues.length; i++) {
									finishRow = $("<div></div>").addClass("finishRow");
									$("<div></div>").addClass("T12").html(window.dpspFoundValues[i][0]).appendTo(finishRow);
									$("<div></div>").addClass("T12").html(window.dpspFoundValues[i][1]).appendTo(finishRow);
									finishRow.appendTo($(".asFound .finishRows"));									

									finishRow = $("<div></div>").addClass("finishRow");
									$("<div></div>").addClass("T12").html(window.dpspLeftValues[i][0]).appendTo(finishRow);
									$("<div></div>").addClass("T12").html(window.dpspLeftValues[i][1]).appendTo(finishRow);
									finishRow.appendTo($(".asLeft .finishRows"));								
								}


								if(window.DPSPVisited) {
									for(var i = 0; i < window.dpspLeftValues.length; i++) {
										window.dpspFoundValues[i][0] = window.dpspLeftValues[i][0];
										window.dpspFoundValues[i][1] = window.dpspLeftValues[i][1];
									}
								}
								else {
									window.DPSPVisited = true;
								}
							});
					}					
				}
			});

			initializeBreadcrumb();		

			for(var i = 0; i < 11; i++) {
				createDPSPRow();
			}

			var liveDPValues = [12.17, 33.16, 56.45, 78.97, 6.86, 47.29];
			var liveSPValues = [15.63, 34.11, 51.14, 98.10, 41.10, 67.73];
			var dpspIndx = 0;

			window.dpspInterval = window.setInterval(function() {
				$("#DPValue").html(liveDPValues[dpspIndx]);
				$("#SPValue").html(liveSPValues[dpspIndx]);
				switch(dpspIndx) {
					case 0:
						dpspIndx = 1;
						break;
					case 1:
						dpspIndx = 2;
						break;
					case 2:
						dpspIndx = 3;
						break;
					case 3:
						dpspIndx = 4;
						break;
					case 4:
						dpspIndx = 0;
						break;
					case 5:
						break;
				}
			}, 1000);

			$(".userInputStatus").click(function() {
				addDPSPRow();
			});
			$("#dpspCheckContent .dpspRows > div:eq(0)").addClass("rowHighlight");

			window.dpspRowCount = 0;

			if(!window.dpspFoundValues) {
				window.dpspFoundValues = [
					["0.00", "0.00"],
					["0.00", "0.00"],
					["0.00", "0.00"],
					["0.00", "0.00"],
					["0.00", "0.00"]
				];
			}
			if(!window.dpspLeftValues) {
				window.dpspLeftValues = [
					["0.00", "0.00"],
					["0.00", "0.00"],
					["0.00", "0.00"],
					["0.00", "0.00"],
					["0.00", "0.00"]
				];
			}

			if(window.DPSPVisited) {
				$("#dpspHeaderText").html("AS LEFT CHECKS");
				for(var x = 0; x < window.dpspFoundValues.length; x++) {						
					var currentRow = $("#dpspCheckContent .dpspRows > div:eq(" + x + ")");
					currentRow.find("div.dpValue").html(window.dpspFoundValues[x][0]).addClass("initialFound");
					currentRow.find("div.spValue").html(window.dpspFoundValues[x][1]).addClass("initialFound");
				}
			}

			function addDPSPRow() {
				if(window.dpspRowCount < 5) {
					if($.trim($("#DPValue").html()) != "" && $.trim($("#SPValue").html()) != "") {
						if(window.dpspRowCount == 4) {							
							$("#btnAcceptAndFinish").removeClass("calibrationDisabledButton").addClass("calibrationButton");
							$("#btnAcceptAndFinish").unbind("click").click(function() {
								window.clearInterval(window.dpspInterval);								

								gotoNextStep();		
								$(this).hide();
								$("#dpspCheckContent").hide();
								$("#calibrationCheckContent").hide();
								$("#calibrationFinish").show().css({opacity: 0}).animate({opacity: 1});						
								$("#btnAddToReportAndFinish").show();
								$(".finishContent").css("height", 460);
								$(".asLeft").css("float", "right");
								$(".finishHeading").css("width", 180);

								$(".asFound .finishRows").html("");
								$(".asLeft .finishRows").html("");							

								var finishRow;
								for(var i = 0; i < window.dpspFoundValues.length; i++) {
									finishRow = $("<div></div>").addClass("finishRow");
									$("<div></div>").addClass("T12").html(window.dpspFoundValues[i][0]).appendTo(finishRow);
									$("<div></div>").addClass("T12").html(window.dpspFoundValues[i][1]).appendTo(finishRow);
									finishRow.appendTo($(".asFound .finishRows"));									

									finishRow = $("<div></div>").addClass("finishRow");
									$("<div></div>").addClass("T12").html(window.dpspLeftValues[i][0]).appendTo(finishRow);
									$("<div></div>").addClass("T12").html(window.dpspLeftValues[i][1]).appendTo(finishRow);
									finishRow.appendTo($(".asLeft .finishRows"));								
								}


								if(window.DPSPVisited) {
									for(var i = 0; i < window.dpspLeftValues.length; i++) {
										window.dpspFoundValues[i][0] = window.dpspLeftValues[i][0];
										window.dpspFoundValues[i][1] = window.dpspLeftValues[i][1];
									}
								}
								else {
									window.DPSPVisited = true;
								}
							});
						}
						
						if(window.DPSPVisited) {
							window.dpspLeftValues[window.dpspRowCount][0] = $("#DPValue").html();
							window.dpspLeftValues[window.dpspRowCount][1] = $("#SPValue").html();	
						}
						else {

							window.dpspFoundValues[window.dpspRowCount][0] = $("#DPValue").html();
							window.dpspFoundValues[window.dpspRowCount][1] = $("#SPValue").html();	
						}

						var currentRow = $("#dpspCheckContent .dpspRows > div:eq(" + window.dpspRowCount + ")");
						$("#dpspCheckContent .dpspRows div.rowHighlight").removeClass("rowHighlight");
						currentRow.find(".dpValue").removeClass("initialFound").html($("#DPValue").html());
						currentRow.find(".spValue").removeClass("initialFound").html($("#SPValue").html());
						currentRow.find("div:last").html("&nbsp;");
						$("<img/>").attr("src", "images/delete-bt-normal.png").addClass("delete").appendTo(currentRow.find("div:last"));
						currentRow.css({opacity: 0}).animate({opacity: 1});						
						currentRow.next().addClass("rowHighlight");
						window.dpspRowCount++;
					}
				}
				else {
					$(".rowHighlight").html("Only 5 rows allowed for demo purpose.").removeClass("rowHighlight").addClass("calibStatus")
						.css({"text-align": "center", "width": "100%", "color": "Gray"});
				}
			}

			// Bind the delete image click event
			$(".dpspRow .delete").live("click", function() {		
				$(this).closest("div.dpspRow").animate({opacity: 0}, null, null, function() {
						$(this).remove(); 
						if($(".calibStatus").size()) {
							$(".calibStatus").remove();		
							createDPSPRow();
						}				
						$("#btnAcceptAndFinish").removeClass("calibrationButton").addClass("calibrationDisabledButton").unbind("click");
						window.dpspRowCount--;
						createDPSPRow();
					});												
			});
		}
		else { // Screens for other calibration types.
			$("#calibrationOverlay").modal({
				containerCss: {
					width: 560,
					height: 560
				}
			});
			$("#dpspCheckContent").hide();
			$("#dpspCalibTypeNav").hide();
			$("#otherCalibTypeNav").show();
			var liveValueIndx = 0;
			var liveValues = [146.2, 160.15, 133.78, 127.15, 159.23];
			window.liveValueInterval = window.setInterval(function() {
				$(".liveHeaderValue").html(liveValues[liveValueIndx]);
				switch(liveValueIndx) {
					case 0:
						liveValueIndx = 1;
						break;
					case 1:
						liveValueIndx = 2;
						break;
					case 2:
						liveValueIndx = 3;
						break;
					case 3:
						liveValueIndx = 4;
						break;
					case 4:
						liveValueIndx = 0;
						break;
				}			
			}, 1000);


			window.foundRows = [];
			window.leftRows = [];			
			$("#calibrationCalibrateContent").hide();
			$("#calibrationVerify").hide();
			$("#calibrationFinish").hide();
			
			$("#calibrationCheckContent").show().css({opacity: 0}).animate({opacity: 1});
			$(".calibrationRows").html("");
			for(var i = 0; i < 11; i++) {
				createCalibrationRow();
			}
			$("#btnAcceptAndFinish").show();
			$("#btnContinue").show();
			$("#btnContinue").val("Continue to Calibrate");
			$("#btnAddToReportAndFinish").hide();
			$("#btnRecalibrate").hide();
			$("#btnAcceptAndContinue").hide();
			$("#btnRezero").hide();
			$("#calibrationCheckContent .calibrationRows div:first").addClass("rowHighlight");		
			$("#txtCalibrationTest").val("");
			$("#txtCalibrationTest").removeAttr("disabled").removeAttr("readonly");
			$("#txtCalibrationTest").focus();
			$("#btnAcceptAndFinish").removeClass("calibrationButton").addClass("calibrationDisabledButton");
			$("#btnContinue").removeClass("calibrationButton").addClass("calibrationDisabledButton");
			$("#btnAcceptAndFinish").unbind("click");
			$("#btnContinue").unbind("click");		
			

			// If the calibration type is "Static Pressure", then add 14.73 to the live value.
			if($("#lstCalibrationType").find("div.combo-middle a").html() === "Static Pressure") {
				$(".liveHeaderValue").html(parseInt(146.20) + 14.73);
			}
			
			window.foundRows = [
				["", "", "1.99%"],
				["", "", "3.49%"],
				["", "", "4.80%"],
				["", "", "5.60%"],
				["", "", "8.89%"]
			];
			
			
			window.calibRowCount = 0;
			function addCalibrationRow() {
				if(window.calibRowCount < 5) {
					if(($.trim($("#txtCalibrationTest").val()) != "") && (!isNaN($("#txtCalibrationTest").val()))) {
						$("#calibrationCheckContent .calibrationRows div.rowHighlight").removeClass("rowHighlight");
						var currentRow = $("#calibrationCheckContent .calibrationRows > div:eq(" + window.calibRowCount + ")");
						currentRow.find("div.testValue").html($("#txtCalibrationTest").val());
						foundRows[window.calibRowCount][0] = $("#txtCalibrationTest").val();
						foundRows[window.calibRowCount][1] = $(".liveHeaderValue").html();
						currentRow.find("div.liveValue").html($(".liveHeaderValue").html());
						if(window.calibRowCount == 0) {
							currentRow.find("div.diffValue").removeClass("T7b").addClass("T12b");
							$("#btnAcceptAndFinish").removeClass("calibrationDisabledButton").addClass("calibrationButton");						

							$("#btnAcceptAndFinish").click(function() {
								goToFinishStep();
								$(this).hide();
								$("#btnContinue").hide();
								$("#calibrationCheckContent").hide();
								$("#calibrationFinish").show().css({opacity: 0}).animate({opacity: 1});						
								$("#btnAddToReportAndFinish").show();		

								var i = 0;
								var finishRow;

								$(".asFound .finishRows").html("");
								$(".asLeft .finishRows").html("");

								for(i = 0; i < window.foundRows.length; i++) {
									if(window.foundRows[i][0] != "") {
										finishRow = $("<div></div>").addClass("finishRow");
										$("<div></div>").addClass("T12").html(window.foundRows[i][0]).appendTo(finishRow);
										$("<div></div>").addClass("T12").html(window.foundRows[i][1]).appendTo(finishRow);
										$("<div></div>").addClass("T7b").html(window.foundRows[i][2]).appendTo(finishRow);
										finishRow.appendTo($(".asFound .finishRows"));

										finishRow = $("<div></div>").addClass("finishRow");
										$("<div></div>").addClass("T12").html(window.foundRows[i][0]).appendTo(finishRow);
										$("<div></div>").addClass("T12").html(window.foundRows[i][1]).appendTo(finishRow);
										$("<div></div>").addClass("T12").html(foundRows[i][2]).appendTo(finishRow);
										finishRow.appendTo($(".asLeft .finishRows"));
									}
								}						
							});

						}					
						if(window.calibRowCount == 4) {						
							$("#btnContinue").removeClass("calibrationDisabledButton").addClass("calibrationButton");

							// change the overlay navigation on click of btnAcceptAndFinish.
							$("#btnContinue").unbind("click").click(function() {						
								gotoNextStep();
								$(this).unbind("click");				
								$(this).bind("click", displayVerify);
								$(this).val("Calibrate");
								displayCalibrate();
							});						
						}
					}				

					currentRow.find("div.diffValue").html(foundRows[window.calibRowCount][2]);
					currentRow.find("div:last").html("&nbsp;");
					$("<img/>").attr("src", "images/delete-bt-normal.png").addClass("delete").appendTo(currentRow.find("div:last"));
					currentRow.css({opacity: 0}).animate({opacity: 1});						
					currentRow.next().addClass("rowHighlight");
					$("#txtCalibrationTest").val("");
					$("#txtCalibrationTest").focus();

					// change the delete image on hover.
					$("img.delete").hover(function() {
						$(this).attr("src", "images/delete-bt-hover.png");
					}, function() {
						$(this).attr("src", "images/delete-bt-normal.png");
					});

					window.calibRowCount++;
				}
				else {
					$(".rowHighlight").html("Only 5 rows allowed for demo purpose.").removeClass("rowHighlight").addClass("calibStatus")
															.css({"text-align": "center", "width": "100%", "color": "Gray"});				
					$("#txtCalibrationTest").attr("disabled", "true").attr("readonly", "true").val("");
					$(".calibrationDiff").html("-").addClass("calibRowStatus");
				}
			}

			// keydown event of calibration test textbox.
			$("#txtCalibrationTest").unbind("keydown").bind("keydown", function(event) {									
				$(".calibrationDiff").html(foundRows[window.calibRowCount] ? foundRows[window.calibRowCount][2] : "");
				if(i != 0) {
					$(".calibrationDiff").removeClass("T1b").addClass("T7b");
				}
				if(event.which == 13) {
					addCalibrationRow();
				}
			});

			// click event of calibration button.
			$(".userInputStatus").unbind("click").click(function(event) {
				addCalibrationRow();
			});
			
			initializeBreadcrumb();
		}
	});		
	
	// creates a new calibration row.
	function createCalibrationRow() {		
		var calibrationRow = $("<div></div>").addClass("calibRow");
		$("<div class='testValue'></div>").addClass("T12").html('&nbsp;').appendTo(calibrationRow);
		$("<div class='liveValue'></div>").addClass("T12").html('&nbsp;').appendTo(calibrationRow);
		$("<div class='diffValue'></div>").addClass("T7b").html('&nbsp;').appendTo(calibrationRow);
		var imgDiv = $("<div class='img'>&nbsp;</div>");		
		imgDiv.appendTo(calibrationRow);
		calibrationRow.appendTo($(".calibrationRows"));		
	}		
	
	// Bind the delete image click event
	$(".calibRow .delete").live("click", function() {		
		$(this).closest("div.calibRow").animate({opacity: 0}, null, null, function() {$(this).remove(); });						
		
		if($(".calibStatus").size()) {
			$(".calibStatus").remove();		
			createCalibrationRow();
		}
		$("#txtCalibrationTest").removeAttr("disabled").removeAttr("readonly");		
		$("#txtCalibrationTest").focus();
		createCalibrationRow();
		$(".calibrationDiff").removeClass("calibRowStatus");
		$("#btnContinue").removeClass("calibrationButton").addClass("calibrationDisabledButton").unbind("click");
		window.calibRowCount--;
	});	
	
	// click event of abort button.
	$("#btnAbort").click(function() {
		$(".checkbox").unbind("click");
		removeBreadcrumbHighlight();
		window.clearInterval(window.liveValueInterval);
		window.clearInterval(window.dpspInterval);
		$.modal.close();
	});
	
	// click event of "add to report and finish"
	$("#btnAddToReportAndFinish").click(function() {
		removeBreadcrumbHighlight();
		$.modal.close();
		$(".checkbox").unbind("click");
		window.clearInterval(window.liveValueInterval);

		switch($("#lstCalibrationType .combo-middle > a").text().toLowerCase()) {
			case "dp-sp check":
				$("#chkDPSPCheckCalibration").addClass("checkbox-active");
				break;
			case "differential pressure":
				$("#chkDPCalibration").addClass("checkbox-active");
				break;
			case "static pressure":
				$("#chkSPCalibration").addClass("checkbox-active");
				break;
			case "temperature/rtd":
				$("#chkTempCalibration").addClass("checkbox-active");
				break;
		}

		if($("#lstCalibrationType .combo-middle > a").text().toUpperCase() == "DP-SP CHECK") {
			window.DPSPVisited = true;
		}

		$("#btnGenerateReport").removeClass("calibrationDisabledButton").addClass("calibrationButton");
		$("#btnGenerateReport").click(function(){
			window.open("calibrationReports.html");        
		})
	});		
});