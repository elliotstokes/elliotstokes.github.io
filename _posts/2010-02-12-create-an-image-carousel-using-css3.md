---
layout: post
category : coding
tags : [Web, CSS3]
---

Recently I have been strolling around the web looking at CSS3 animations and have been blown away by what people have been doing with it. So I decided I ought to give it a go and see what it's like to work with. It turns out its dead easy despite the ever present vendor prefixes.

I started off with this markup.

<pre>

	&lt;div id="imageViewer"&gt;
		&lt;div id="imageViewerImages"&gt;
			&lt;img src="./images/image1.png" alt="flower" /&gt;
			&lt;img src="./images/image2.png" alt="flower1"/&gt;
			&lt;img src="./images/image3.png" alt="flower2"/&gt;
			&lt;img src="./images/image4.png" alt="flower3" /&gt;
			&lt;img src="./images/image5.png" alt="flower4"/&gt;
		&lt;/div&gt;
	&lt;/div&gt;
	
	&lt;div id="imageViewerControls"&gt;&lt;/div&gt;

</pre>

So thats just a div within a div filled with a set of images and a placeholder div for some controls to move between photos. Now we need to style it and add the magic CSS that will animate our css properties when they change. 

Below is the CSS I used:

<pre>
#imageViewer {
	width:320px;
	height:214px;
	overflow:hidden;
	position:relative;
}

#imageViewerImages {
	position:absolute;
	left:0px;
	width:1800px;
	-webkit-transition:all 1.0s ease-in-out;
	-moz-transition:all 1.0s ease-in-out;
	-o-transition:all 1.0s ease-in-out;
	-transition:all 1.0s ease-in-out;
}

#imageViewerImages img {
	padding:0;
	margin:0;
	float:left;
}

#imageViewerControls div {
	padding-right:1em;
	cursor:pointer;
	float:left;
}

#imageViewerControls {
	width:320px;
}
</pre>

What we have here is <code>#imageViewer</code> the container div which shows a 320x214 pixel window with its overflow hidden so you only see one photo. <code>#ImageVieweImages</code> holds all the images. It also hold the transition tag. This is the part which handles all the animation.

The transision tag is made up of 3 parts:

<code>transition:\[all\] \[1.0s\] \[ease-in-out\];</code>

The first part is what css properties it applies to with <code>\[all\]</code> meaning any property on that item. The second part <code>\[1.0s\]</code> is how long the animation should last and the third part is the type of animation. The type of animation adjusts the speed of animating through the time. The <code>\[ease-in-out\]</code> attribute for example starts slowly, speeds up and then slows down again towards the end.

Now all we need to do is add some controls to change the current image. For this we are going to write a tiny bit of JavaScript to alter the left property of the div thats holding all the images. Below is the script.

<pre>
&lt;script type="text/javascript"&gt;

$(document).ready(function() {
	$("#imageViewerImages img").each(function(i) {
		$("#imageViewerControls").append($("&lt;div/&gt;").html(this.alt).click(function() {
			var left = ((i * 320) * -1).toString() + "px";
			$("#imageViewerImages").css("left",left);
		}));
	});

});

&lt;/script&gt;
</pre>

What the script is doing is grabbing each of the images in the carousel, getting its alt text and appending a div to the controls div with a click event. The click event then works out how far right the image needs to be pushed to show completely and then sets the left value with the css transition handling all the animation for you.

That's it. If its all gone to plan you should see something like what I have below. 


