---
layout: post
category : coding
tags : [Apache, Web]
---


As you may or may not know the Ordnance Survey have been releasing some of their data for free for a while now. I wanted to have a play with it and as I am currently looking at d3 and d3 comes with built in support for geographic data, I thought it would be neat to render some of this data with d3.

#Getting the Data

The data can be downloaded [here](). For the purposes of the demo I have chosen some of the data from Boundary-Line, namely the outline shape file.

#Converting the data

The vector data provided by the Ordnance Survey is currently only distributed in <code>.shp</code> format. Whilst being a great format, it isn't really much use on the web in this format, so we need to convert the data to <code>geojson</code>. Geojson is an open format used for encoding simple geographic features. 

D3 supports many data projections out of the box but British national grid isn't one of them so we need to convert the coordinates to lat/long as well before we can start using it. Luckily there are some free tools that can do all of this for us.

<div>
There are many other ways to convert the data this is just the easiest way I have found that uses free software. If you already have a convertor then you can skip this step.
</div>

Firstly as a prerequisite you are going to need <code>brew</code>. If you dont have brew installed you can install it by running this command:

	ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go/install)"

Follow [this guide](http://coolestguidesontheplanet.com/setting-up-os-x-mavericks-and-homebrew/) if you get into trouble. `Once the is installed use it to install a package called <code>gdal</code>.

	brew install gdal

gdal or global data abstraction library is a geospatial data conversion library that provides a set of tools to easily convert your data. Once it's installed navigate to your data and run the following command:

	ogr2ogr -f geoJSON outline1.json coastline.shp -t_srs "+proj=longlat +ellps=WGS84 +no_defs +towgs84=0,0,0"

This command is converting the coastline shape file into geojson and at the same time is converting the coordinates to lat/long (WGS 1984).

#Reducing the size of the geojson

By default the data output for the outline of the uk comes in at about 8.1mb. That's not an insignificant amount of data to hold in memory and then render. We should really see if we can reduce the data size. Looking into the documentation to ogr2ogr there are two parameters which should be able to help us.

- <code>simplify {tolerance}</code>. What the simplify does is to simplify the underlying geometry, removing some of the points to essentially smooth out the shape.
- <code>lco COORDINATE_PRECISION={precision}</code>. By default the coordinates are stored to 15 decimal places. This is probably overkill for our purposes. We can provide a precision to reduce the number of decimal places which should 

This then gives us an updated command to convert the data:

	ogr2ogr -f geoJSON outline3.json coastline.shp -t_srs "+proj=longlat +ellps=WGS84 +no_defs +towgs84=0,0,0" -lco COORDINATE_PRECISION=5 -simplify 5

Running this again and comparing to the original convert the file has been reduced to 3.9mb from 8.1mg a reduction of 4.2mb.

#Drawing the data

So now we have the data in a usable format and are ready to render. We just need to load the json file, select all the features and draw them on an svg canvas. The following code will do just that:

<pre>

var xym = d3.geo.mercator()
    .translate([650,3780])
    .scale(2800),
	path = d3.geo.path().projection(xym);

	
d3.json("geoinformation.json", function (json) {
    lineContainer.selectAll("path")   // select all the current path nodes
        .data(json.features)      // bind these to the features array in json
        .enter().append("path")   // if not enough elements create a new path
        .attr("d", path)          // transform the supplied jason geo path to svg
        .attr("fill","none")
        .attr('stroke', 'black')
});
</pre>



#Altering the Envelope

<pre>
xym.scale(scale).translate([x,y]);
svg.selectAll("path").attr("d", path);
</pre>

