---
layout: post
category : coding
tags : [Web, Html5, JavaScript]
---

I was interested to see how easy it is to manipulate images using the canvas. To demonstrate some of the functionality I set about creating a small little applcation that converts an image to grayscale. It consists of two canvas elements, one for the source image and one for the converted image.


Firstly in markup you want to create a page with the two canvas elements, or if you prefer just do it on the same canvas. Other than that just add a button to do the conversion. My markup is shown below.

<pre class="prettyprint linenums">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;title&gt;Convert to Grayscale&lt;/title&gt;
	&lt;script type="text/javascript" src="grayscale.js"&gt;&lt;/script&gt;

	&lt;script type="text/javascript"&gt;

	window.onload = function () {
		var canvas = document.getElementById("input");
		var context = canvas.getContext("2d");
		var button = document.getElementById("convert");

		button.disabled = true;
		var image = new Image();
		image.onload = function () {
			context.drawImage(image, 0, 0);
			button.disabled= false;
			button.value = "Convert";
		}

		image.src = "DSC_0063.JPG";

	}

	function convert() {
		var input = document.getElementById("input");
		var &lt;output = document.getElementById("output");
		grayscale(input,output);
	}

	&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
	&lt;canvas id="input" width="400" height="300"&gt;N00b you dont have a browser that supports this.&lt;/canvas&gt;
	&lt;div&gt;&lt;input id ="convert" type="button" onclick="convert()" value="Loading..."/&gt;&lt;/div&gt;
	&lt;div&gt;Converted image should be shown below&lt;/div&gt;
	&lt;canvas id="output" width="400" height="300"&gt;N00b you dont have a browser that supports this.&lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt;

</pre>

Next you want to load your image and display this image in the input canvas. As you can see above I have added this into the window.onload event. I have also done some disabling of the convert button until the image has been loaded and displayed.

Once the image has been displayed your now ready to convert it to grayscale. I wrote the function below to do this.

<pre class="prettyprint linenums">
function grayscale (input,output) {
	//Get the context for the loaded image
	var inputContext = input.getContext("2d");
	//get the image data;
	var imageData = inputContext.getImageData(0, 0, input.width, input.height);
	//Get the CanvasPixelArray
	var data = imageData.data;

	//Get length of all pixels in image each pixel made up of 4 elements for each pixel, one for Red, Green, Blue and Alpha
	var arraylength = input.width * input.height * 4;
	//Go through each pixel from bottom right to top left and alter to its gray equiv

    //Common formula for converting to grayscale.
	//gray = 0.3*R + 0.59*G + 0.11*B
	for (var i=arraylength-1; i&gt;0;i-=4)
	{
		//R= i-3, G = i-2 and B = i-1
		//Get our gray shade using the formula
		var gray = 0.3 * data[i-3] + 0.59 * data[i-2] + 0.11 * data[i-1];
		//Set our 3 RGB channels to the computed gray.
		data[i-3] = gray;
		data[i-2] = gray;
		data[i-1] = gray;

	}

	//get the output context
	var outputContext = output.getContext("2d");

	//Display the output image
	outputContext.putImageData(imageData, 0, 0);
}
</pre>

As you can see its pretty simple really. Were just grabbing the <code>CanvasPixelArray</code> and looping through the pixels in blocks of 4 (R,G,B,A), computing the Gray colour and setting this colour to all R,G and B (ignoring A).

That is it. If your gonna do something similar there are a few things to consider. Calling <code>getImageData()</code> is limited to same domain assets so if you want to load an image from a location on the web you will need to do so through a proxy.
