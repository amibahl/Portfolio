/*
CAxis Labels Plugin for flot. :P
Copyright (c) 2010 Xuan Luo

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */
(function ($) {
    var options = { };

    function init(plot) {
        // This is kind of a hack. There are no hooks in Flot between
        // the creation and measuring of the ticks (setTicks, measureTickLabels
        // in setupGrid() ) and the drawing of the ticks and plot box
        // (insertAxisLabels in setupGrid() ).
        //
        // Therefore, we use a trick where we run the draw routine twice:
        // the first time to get the tick measurements, so that we can change
        // them, and then have it draw it again.
        var secondPass = false;
        plot.hooks.draw.push(function (plot, ctx) {
            if (!secondPass) {
                // MEASURE AND SET OPTIONS
                $.each(plot.getAxes(), function(axisName, axis) {
                    var opts = axis.options // Flot 0.7
                        || plot.getOptions()[axisName]; // Flot 0.6
                    if (!opts || !opts.axisLabel)
                        return;
                    var w, h;                   
                        // HTML text
                        var elem = $('<div class="axisLabels" style="position:absolute;color:' + opts.color + '">' + opts.axisLabel + '</div>');
                        plot.getPlaceholder().append(elem);
                        w = elem.outerWidth(true);
                        h = elem.outerHeight(true);
                        elem.remove();
					/*
                    if (axisName.charAt(0) == 'x')
                        axis.labelHeight += h;
                    else
                        axis.labelWidth += w;
                    opts.labelHeight = axis.labelHeight;
                    opts.labelWidth = axis.labelWidth;
					*/
                });
                // re-draw with new label widths and heights
                secondPass = true;
                plot.setupGrid();
                plot.draw();
            } else {
                // DRAW
                $.each(plot.getAxes(), function(axisName, axis) {
                    var opts = axis.options // Flot 0.7
                        || plot.getOptions()[axisName]; // Flot 0.6
                    if (!opts || !opts.axisLabel)
                        return;                     
                        // HTML text
                        plot.getPlaceholder().find('#' + axisName + 'Label').remove();
                        var elem = $('<div id="' + axisName + 'Label" class="axisLabels" style="position:absolute;color:' + opts.color + '">' + opts.axisLabel + '</div>');
                        if (axisName.charAt(0) == 'x') {
                            elem.css('left', plot.getPlotOffset().left -50+ 'px');
                            elem.css('bottom', '0px');
                        } else {
                            elem.css('top', plot.getPlotOffset().top -28 + 'px');
                            elem.css('left', '0px');
                        }
                        plot.getPlaceholder().append(elem);                    
                });
                secondPass = false;
            }
        });
    }



    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'axisLabels',
        version: '1.0'
    });
})(jQuery);
