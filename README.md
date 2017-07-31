# chartjs-plugin-highlow
This plugin makes it easy to draw high-low line on chartjs.

## Usage
```js
options: {
	highlow: {
		high: 0, // index of high-value series
		low: 1, // index of low-value series
        onDrawLine: function (ctx, p0, p1, highlow) { 
			// followings are called after a high-low line has drawn
			// ex. draw arrow shaped line caps
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(p0.x, p0.y);
			ctx.lineTo(p0.x - 3, p0.y + 5);
			ctx.moveTo(p0.x, p0.y);
			ctx.lineTo(p0.x + 3, p0.y + 5);
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p1.x - 3, p1.y - 5);
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p1.x + 3, p1.y - 5);
			ctx.stroke();
			ctx.restore();
        }
	}
}
```

## Screenshots
![high-low](https://raw.githubusercontent.com/hority/chartjs-plugin-highlow/master/images/high-low.png)