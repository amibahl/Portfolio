(function($) {
    $.fn.extend({
        spinit: function(options) {
            var settings = $.extend({ min: 0, max: 100, initValue: 0, callback: null, stepInc: 1, pageInc: 10, width: 50, height: 15, btnWidth: 10, mask: '',fixedFloat:false,floatLimit:2,fontWeight:'normal' }, options);
            return this.each(function() {
			    
				if($(this).val()!='')
				{
				  settings.initValue =parseFloat($(this).val());
				}
                var UP = 38;
                var DOWN = 40;
                var PAGEUP = 33;
                var PAGEDOWN = 34;
				var index=false;
                var mouseCaptured = false;
                var mouseIn = false;
                var interval;
                var direction = 'none';
                var isPgeInc = false;
                var value = Math.max(settings.initValue, settings.min);	
				if(settings.fixedFloat)
				{			
					value= parseFloat(value).toFixed(settings.floatLimit);
				}							
                var el = $(this).val(value).css('width', (settings.width) + 'px').css('height', settings.height + 'px').css('font-weight', settings.fontWeight ).addClass('smartspinner');
				$(this).attr('title',value);
				$(this).parent().attr('title',"");
                raiseCallback(value,el);
                if (settings.mask != '') el.val(settings.mask);
                $.fn.reset = function(val) {				
                    if (isNaN(val)) val = 0;
                    value = Math.max(val, settings.min);
                    $(this).val(value);
                    raiseCallback(value, el);
                };
                function setDirection(dir) {
                    direction = dir;
                    isPgeInc = false;
                    switch (dir) {
                        case 'up':
                            setClass('up');
                            break;
                        case 'down':
                            setClass('down');
                            break;
                        case 'pup':
                            isPgeInc = true;
                            setClass('up');
                            break;
                        case 'pdown':
                            isPgeInc = true;
                            setClass('down');
                            break;
                        case 'none':
                            setClass('');
                            break;
                    }
                }
                el.focusin(function() {
				
                  // el.val(value);
                });
				  el.focusout(function() {
					clearInterval(interval);
             		if (isNaN(el.val()))
					{
					  if(settings.fixedFloat)
									{
					  el.val(parseFloat(0).toFixed(settings.floatLimit));
					  }
					  else
					  {
					     el.val(0);
					  }
					}
					else
					{
					   if(settings.fixedFloat)
						 {
						  el.val(parseFloat(el.val()).toFixed(settings.floatLimit));
						 }
					
					}
					 setDirection('none');
					 direction = 'text';										
					 onValueChange();
                });
                el.click(function(e) {
                    mouseCaptured = true;
                    isPgeInc = false;
                    clearInterval(interval);
                    onValueChange();
                });
                el.mouseenter(function(e) {
                 //   el.val(value);
                });
                el.mousemove(function(e) {

                    if (e.pageX > (el.offset().left + settings.width)) {
                        if (e.pageY < el.offset().top + settings.height / 2)
                            setDirection('up');
                        else
                            setDirection('down');
                    }
                    else
                        setDirection('none');
                });
                el.mousedown(function(e) {
                    isPgeInc = false;
                    clearInterval(interval);
                    interval = setInterval(onValueChange, 180);
                });
                el.mouseup(function(e) {
                    mouseCaptured = false;
                    isPgeInc = false;
                    clearInterval(interval);

                });
                el.mouseleave(function(e) {
                    setDirection('none');
					 clearInterval(interval);
                    if (settings.mask != '') el.val(settings.mask);
                }); el.keydown(function(e) {
			
                    switch (e.which) {
                        case UP:
                            setDirection('up');
                            onValueChange();
                            break; // Arrow Up
                        case DOWN:
                            setDirection('down');
                            onValueChange();
                            break; // Arrow Down
                        case PAGEUP:
                            setDirection('pup');
                            onValueChange();
                            break; // Page Up
                        case PAGEDOWN:
                            setDirection('pdown');
                            onValueChange();
                            break; // Page Down
                        default:
                            setDirection('none');
                            break;
                    }
                });

                el.keypress(function(e) {
                  
                });
			    el.change(function(e) {
                    setDirection('none');
					direction = 'change';				
					onValueChange();
                });
                el.keyup(function(e) {
						  if(e.which != 9)
						  {						  
                           var val = el.val();
							if(val.length > 0)
							{				
								// get decimal character and determine if negatives are allowed								
								var decimal =".";
								  if(!settings.fixedFloat)
									{
									   decimal ="";
									}
									var negative = true;
									if(settings.min>0)
									{
									negative=false;
									}
								
								// prepend a 0 if necessary
								if(decimal != "")
								{
									// find decimal point
									var dot = val.indexOf(decimal);
									// if dot at start, add 0 before
									if(dot == 0)
									{
										this.value = "0" + val;
									}
									// if dot at position 1, check if there is a - symbol before it
									if(dot == 1 && val.charAt(0) == "-")
									{
										this.value = "-0" + val.substring(1);
									}
									val = this.value;
								}
								
								// if pasted in, only allow the following characters
							var validChars = [0,1,2,3,4,5,6,7,8,9,'-',decimal];
							// get length of the value (to loop through)
							var length = val.length;
							// loop backwards (to prevent going out of bounds)
							for(var i = length - 1; i >= 0; i--)
							{
								var ch = val.charAt(i);
								// remove '-' if it is in the wrong place
								if(i != 0 && ch == "-")
								{
									val = val.substring(0, i) + val.substring(i + 1);
								}
								// remove character if it is at the start, a '-' and negatives aren't allowed
								else if(i == 0 && !negative && ch == "-")
								{
									val = val.substring(1);
								}
								var validChar = false;
								// loop through validChars
								for(var j = 0; j < validChars.length; j++)
								{
									// if it is valid, break out the loop
									if(ch == validChars[j])
									{
										validChar = true;
										break;
									}
								}
								// if not a valid character, or a space, remove
								if(!validChar || ch == " ")
								{
									val = val.substring(0, i) + val.substring(i + 1);
								}
							}
							// remove extra decimal characters												
							var firstDecimal = val.indexOf(decimal);
							if(firstDecimal > 0)
							{
								for(var i = length - 1; i > firstDecimal; i--)
								{
									var ch = val.charAt(i);
									// remove decimal character
									if(ch == decimal)
									{
										val = val.substring(0, i) + val.substring(i + 1);
									}
								}
							}
							// set the value and prevent the cursor moving to the end
							   if(val.length > 1)
							  {
							    if (val < settings.min) 
								{
								   val = settings.min;								
								}
								else  if (val > settings.max) 
								 {
								    val = settings.max;								 
								 }					 
											
												
							   }
							  
							      el.val(val);
							}  
							}
							  // setDirection('none');
					          // direction = 'text';										
					          // onValueChange();
					
                });
                el.blur(function() {
					clearInterval(interval);
                    if (settings.mask == '') {
                            if (el.val() == '')
						    {
                                     if(settings.fixedFloat)
									  {
										el.val(parseFloat(0).toFixed(settings.floatLimit));
									  }
									  else
									  {
										 el.val(0);
									  }
							}
							else
							{
							 if (isNaN(el.val()))
									{
									  if(settings.fixedFloat)
													{
										el.val(parseFloat(0).toFixed(settings.floatLimit));
									  }
									  else
									  {
										 el.val(0);
									  }
								    }
							}
						
                    }
                    else {
							if (isNaN(el.val()))
							{
								  if(settings.fixedFloat)
								  {
								    el.val(parseFloat(0).toFixed(settings.floatLimit));
								   }
								  else
								  {
									 el.val(0);
								  }
							}
							else
							{
							   if(settings.fixedFloat)
								 {
								  el.val(parseFloat(el.val()).toFixed(settings.floatLimit));
								 }
							
							}
							
                        }
					
						 setDirection('none');
						 direction = 'text';										
						 onValueChange();
                });
                el.bind("mousewheel", function(e) {
                    if (e.wheelDelta >= 120) {
                        setDirection('down');
                        onValueChange();
                    }
                    else if (e.wheelDelta <= -120) {
                        setDirection('up');
                        onValueChange();
                    }

                    e.preventDefault();
                });
                if (this.addEventListener) {
                    this.addEventListener('DOMMouseScroll', function(e) {
                        if (e.detail > 0) {
                            setDirection('down');
                            onValueChange();
                        }
                        else if (e.detail < 0) {
                            setDirection('up');
                            onValueChange();
                        }
						
                        e.preventDefault();
                    }, false);
                }

                function raiseCallback(val, el) {
                    if (settings.callback != null) settings.callback(val, el);
                }
                function getSelectedText() {

                    var startPos = el.get(0).selectionStart;
                    var endPos = el.get(0).selectionEnd;
                    var doc = document.selection;

                    if (doc && doc.createRange().text.length != 0) {
                        return doc.createRange().text;
                    } else if (!doc && el.val().substring(startPos, endPos).length != 0) {
                        return el.val().substring(startPos, endPos);
                    }
                    return '';
                }
                function setValue(a, b) {
                    if (a >= settings.min && a <= settings.max) {
                        value = b;
                    }				
				 
                    if(settings.fixedFloat)
					{	
			            el.val(parseFloat(value).toFixed(settings.floatLimit));					   
					}
					else
					{					
					     el.val(parseInt(value,10));
					}
                }
                function onValueChange() {				
				       
				   if(el.val()=='')
				   {					   
					 value=0;
				   }
				   else
				   {
					 value=parseFloat(el.val());	
				   }				 
				
                    if (direction == 'up') {
                        value += settings.stepInc;						
                        if (value > settings.max) value = settings.max;
						if (value < settings.min) value = settings.min;
                        setValue(parseFloat(el.val()), value);
                    }
                    if (direction == 'down') {
                        value -= settings.stepInc;
						if (value > settings.max) value = settings.max;
                        if (value < settings.min) value = settings.min;
                        setValue(parseFloat(el.val()), value);
                    }
                    if (direction == 'pup') {
                        value += settings.pageInc;
                        if (value > settings.max) value = settings.max;
						if (value < settings.min) value = settings.min;
                        setValue(parseFloat(el.val()), value);
                    }
                    if (direction == 'pdown') {
                        value -= settings.pageInc;
						if (value > settings.max) value = settings.max;
                        if (value < settings.min) value = settings.min;
                        setValue(parseFloat(el.val()), value);
                    }
					if (direction == 'text') 
					 {                    
                        if (value < settings.min) 
						{
						 value = settings.min;
						 setValue(parseFloat(el.val()).toFixed(settings.floatLimit), value);
						}
						else if (value > settings.max) 
						 {
						   value = settings.max;
						   setValue(parseFloat(el.val()).toFixed(settings.floatLimit), value);
						 }				
                        else  if(!settings.fixedFloat)
					     {						 
			               setValue(parseFloat(el.val()).toFixed(settings.floatLimit), value);
						 }						
                    }
					
					 if (direction == 'change') {
                     
                        if (value < settings.min) 
						{
						   value = settings.min;
						   setValue(parseFloat(el.val()).toFixed(settings.floatLimit), value);
						}
					   else if (value > settings.max) 
					    {
						   value = settings.max;
						   setValue(parseFloat(el.val()).toFixed(settings.floatLimit), value);
					    }	
                       else 						
					    {								 
					      setValue(parseFloat(el.val()).toFixed(settings.floatLimit), value);
					    }
						
                    }
					 try
						{				
							  validateNumericValue(el);
						}
				   catch(ex)
						{
							
						}
                    raiseCallback(value, el);
                }
                function setClass(name) {
                    el.removeClass('up').removeClass('down');
                    if (name != '') el.addClass(name);
                }
            });
        }
    });
})(jQuery);