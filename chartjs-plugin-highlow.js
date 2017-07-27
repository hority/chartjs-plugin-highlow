(function (Chart) {
    "use strict";

    Chart.plugins.register({
        defaultOptions: {
            // index of high-series and low-series
            high: undefined,
            low: undefined,
            // hook for drawing line - function onDrawLine(ctx,p0,p1,highlow)
            onDrawLine: null,
            // strokeStyle of high-low line
            storokeStyle: 'rgba(0,0,0,1)'
        },

        beforeDraw: function (chart) {
            var plugin = this;
            chart.highlow = {};
            var helpers = Chart.helpers;
            var options = chart.options;

            if (options.highlow) {
                var clonedDefaultOptions = helpers.clone(plugin.defaultOptions);
                var highlow = helpers.extend(clonedDefaultOptions, options.highlow);
                chart.highlow = highlow;
            }
        },

        beforeDatasetDraw: function (chart, args) {
            var highlow = chart.highlow;
            if (!highlow) {
                return;
            }

            var helpers = Chart.helpers;
            var high = parseFloat(highlow.high);
            var low = parseFloat(highlow.low);

            if (isFinite(high) && Math.floor(high) === high
                && isFinite(low) && Math.floor(low) === low
                && high != low) {

                var ctx = chart.ctx;

                var lowds = chart.getDatasetMeta(low).dataset;
                var highds = chart.getDatasetMeta(high).dataset;

                var lowv = low._view;
                var highv = high._view;

                var lowp = lowds._children || [];
                var highp = highds._children || [];

                var count = Math.min(lowp.length, highp.length);

                helpers.canvas.clipArea(ctx, chart.chartArea);
                ctx.strokeStyle = highlow.storokeStyle;
                for (var i = 0; i < count; i++) {
                    var p0 = lowp[i]._view;
                    var p1 = highp[i]._view;

                    if (p0 && !p0.skip && p1 && !p1.skip) {
                        ctx.beginPath();
                        ctx.moveTo(p0.x, p0.y);
                        ctx.lineTo(p1.x, p1.y);
                        ctx.stroke();

                        if (highlow.onDrawLine !== null) {
                            highlow.onDrawLine(ctx, p0, p1, highlow);
                        }
                    }
                }
                helpers.canvas.unclipArea(ctx);

            }
        }
    });
})(Chart);