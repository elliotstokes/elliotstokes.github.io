---
layout: post
category : coding
tags : [Web, JavaScript, D3]
image: d3.jpg
---

I have been hearing a lot about d3 of late and wanted to have a play with it to see how easy it is to create something useful. As seems to be the tradition I thought it would be good to try creating some graphs. So below is my attempt at creating a graph.

<iframe width="100%" height="250" src="http://jsfiddle.net/elliotstokes/58Z3X/embedded/result" frameborder="0"> </iframe>

If you want to have a look at the code you can view the [above fiddle](http://jsfiddle.net/elliotstokes/58Z3X/).

##Drawing the bars

So the main part of a bar graph is the bars. Without them you just have, well nothing. Below is a code snippet that I am using to create my bars:

<pre class="prettyprint linenums">
//Some items to graph
var items = [{name:'name',value:22}...]

//setup variables
var barHeight = 30,
	height = (barHeight * items.length) + 20,
	width = 500,
	xmargin = 50,
	ymargin = 5;

//create the container
var svgContainer = d3.select("body").append("svg")
	.attr("width", width + xmargin + 10)
	.attr("height", height + ymargin)
	.append("g")
	.attr("transform", "translate(" + xmargin + "," + ymargin + ")");

//create a function that will scale the bars properly to fit the space we have
var x = d3.scale.linear()
    .domain([0, d3.max(items, function (d) {
    	return d.value;
	})])
    .range([0, width]);

//append some g's
var bar = svgContainer.selectAll("g")
    .data(items)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
    return "translate(0," + i * barHeight + ")";
});

//apend some rect's to those g's
bar.append("rect")
    .attr("height", barHeight - 1)
    .attr("width", function (d) {
    	return x(d.value);
	});
</pre>

So what are we doing here. Firstly we are selecting the <code>body</code> and appending a blank svg tag to host the bar chart. All the bars will be dynamically added to this in the next section.

 The next task is creating a scale function to scale the bars to the width of the container. This then ensures the largest value fills the container and the other items scale appropriately.

 Now we have a blank <code>svg</code> container, we take each item in the items array and append a <code>g</code> to the <code>svgcontainer</code>. When it appends each one, it translates it in the y direction so that they are stacked on top of each other. This will ensure that the bars will appear underneath each other.

 Now each rectangle is drawn inside the newly created <code>g</code> tag. The width being set is the result of the linear scale function we setup earlier with the value of the item we are graphing being passed in.

This will then give you some bars. We currently have no way to tell what the values on the x and y axis are. One way to inform viewers is to whack some axis on.

##Drawing the axis

On the example I have created I used two different types of axis. Regardless of the axis type the method of adding them to the svg canvas is the same. The method is

1. Create a scale
2. Create an axis and link to the created scale.
3. Add the axis to the svg container.

Now the code for drawing the x-axis looks like:

<pre class="prettyprint linenums">
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

The scale on the x axis is a linear scale as our bars are protruding horizontally from the left. We are showing the axis on the bottom so we are orienting it to the bottom and when adding it we are translating it so it draws right at the bottom of the container.

The y axis is drawn in exactly the same way except we are using an ordinal scale and we are rotating the text to reduce the space we need. The code for this is below:

<pre class="prettyprint linenums">
 var y = d3.scale.ordinal()
    .domain(items.map(function (d) {
        return d.name;
    }))
    .rangeBands([0, height - 20]);

var yAxis = d3.svg.axis()
    .orient("left")
    .scale(y);

    svgContainer.append("g").call(yAxis)
        .attr("class", "axis")
        .attr("transform", "translate(-5,0)")
        .selectAll("text")
        .attr("dy", "-.6em")
        .attr("dx", ".6em")
        .attr("transform", function (d) {
        return "rotate(-35)"
    });
</pre>

Once this has completed our bars should be now nestled against our two axis. The graph is now complete. Time for some showboating.

##Adding some transitions

What would be really nice is if the bars draw one by one and grow from the left this can be achieved with a delay and a transition on the width. We can update our code above to this:

<pre class="prettyprint linenums">
var bar = svgContainer.selectAll("g")
    .data(items)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
    	return "translate(0," + i * barHeight + ")";
	});

bar.append("rect")
    .attr("height", barHeight - 1)
    /* add */
    .attr("width", 0)
    .transition()
    .delay(function (d, i) {
    	return i * 400;
	})
	.duration(400)
	/* end add */
    .attr("width", function (d) {
    	return x(d.value);
	});
</pre>

The code is identical to the previous bar generating code accept for the commented additions. Firstly the width is set to 0 so that any transitions on the width have a point to animate from. The object is then tagged as an item to run transition's on by using the <code>transition()</code> function. I am then delaying each one by the duration of the animation. This gives the effect of each bar drawing one by one. Finally we are then setting the animation duration and then setting the proper width which will then transition from 0 and slide out from the left.

There we have it, a snazzy graph with a bit of animation to make it stand out a bit.
