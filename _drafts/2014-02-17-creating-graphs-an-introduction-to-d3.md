---
layout: post
category : coding
tags : [Web, JavaScript, D3]
---

I have been hearing a lot about d3 of late and wanted to have a play with it to see what could be done. As seems to be the tradition I thought it would be good to try creating some graphs. So below is my attempt at creating a graph.

<iframe width="100%" height="250" src="http://jsfiddle.net/elliotstokes/58Z3X/embedded/result" frameborder="0"> </iframe>

If you want to have a look at the code you can view the [above fiddle](http://jsfiddle.net/elliotstokes/58Z3X/).

##Drawing the bars

So the main part of a bar graph is the bars. Without them you just have, well nothing.

<pre>
var bar = svgContainer.selectAll("g")
    .data(items)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
    return "translate(0," + i * barHeight + ")";
});

bar.append("rect")
    .attr("height", barHeight - 1)
    .attr("width", function (d) {
    	return x(d.value);
	});
</pre>

##Drawing the axis

On the example I have created I used two different types of axis. Regardless of the axis type the method of adding them to the svg canvas is the same. The method is 

1. Create a scale
2. Create an axis and link to the created scale.
3. Add the axis to the svg container.

Now in the code this looks like:

<pre>
//create a scale
var x = d3.scale.linear()
	.domain([0, d3.max(items, function (d) {
        return d.value;
	})])
	.range([0, width]);

//create an axis
var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

//add axis to the svg container
svgContainer.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (height - 20) + ")")
	.call(xAxis);

</pre>

##Adding some transitions

What would be really nice is if the bars draw one by one and grow from the left this can be acheived with a delay and a transition on the width. We can update our code above to this:

<pre>

var bar = svgContainer.selectAll("g")
    .data(items)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
    	return "translate(0," + i * barHeight + ")";
	});

bar.append("rect")
    .attr("height", barHeight - 1)
    .attr("width", 0)
    .transition()
    .delay(function (d, i) {
    	return i * 400;
	})
	.duration(400)
    .attr("width", function (d) {
    	return x(d.value);
	});
</pre>

Creating the bars is good, adding some animation makes it great it also makes it stand out more.

