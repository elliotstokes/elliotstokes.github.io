---
layout: post
category : coding
tags : [Web, Html5, JavaScript]
---

Chrome has now supported the Shadow Dom spec since version 25/26. I thought it was about time to have a look at it and the problems it aims to solve. A common-or-garden web page exists as one big global dom tree where each element is free to interact and alter each other. Whilst this is useful, sometimes you don't want this. When writing web applications it is generally good practice to componentise your code and the idea of encapsulating the style and markup into a seperate dom tree, away from the reaches of over the top css selectors sounds really appealing. That's really the reason for shadow dom.

<div class="alert alert-warning">Whilst shadow dom allows components to be encapsulated it's not really a security thing and shouldn't be treated as such.</div>

##Basic example

So it's probably worth seeing an example. If we take the markup:

<pre class="prettyprint linenums">
&lt;template id="nameTagTemplate"&gt;
   &lt;style&gt;
      .outer {
         background-color: red;
         padding:20px;
         margin-bottom:10px;
      }

      .boilerplate {
         background-color: white;
      }
   &lt;/style&gt;

   &lt;div class="outer"&gt;
      &lt;div class="boilerplate"&gt;
         Hi! My name is
         &lt;div class="name"&gt;
            &lt;content&gt;&lt;/content&gt;
         &lt;/div&gt;
      &lt;/div&gt;
   &lt;/div&gt;
&lt;/template&gt;


&lt;welcomer&gt;trevor&lt;/welcomer&gt;

&lt;div class="outer"&gt;
   Style limited to template
&lt;/div&gt;
</pre>

This markup is showing two main things. The first is the template which contains some style and some markup. Note also the content tag which allows you to inject the content from the main dom into the shadow dom. The second is the <code>&lt;welcomer&gt;</code> tag which will host the templated item.

The markup alone isn't really going to set the world on fire. If we then add this script:

<pre class="prettyprint linenums">
&lt;script&gt;
var shadow = document.querySelector('welcomer').webkitCreateShadowRoot();
var template = document.querySelector('#nameTagTemplate');
shadow.appendChild(template.content);
template.remove();
&lt;/script&gt;
</pre>

This script is creating a shadow dom for each <code>welcomer</code> tag. It then grabs the template and appends the template to the shadow dom. Once thats done it removes the template from the main dom.

This will then render out like this:

<img src="{{ site.url }}/assets/images/shadow-dom.png" class="img-responsive"/>

As you can see in the example the template's dom elements are not exposed in the main dom and are kept seperate. You can also see the div below it with the class <code>.outer</code> has not taken the style specified in the template. It is possible to also allow the styles by setting the property:

<pre class="prettyprint">
   shadowRoot.applyAuthorStyles = true;
</pre>

##Extending the Example

In the simple example above the template was held as part of the page. Generally speaking things would be easier to maintian and understand if the template could be split out into a seperate file and loaded in at startup or whenever it was needed. It would also be nice to automate this for any tag.

So to do this we need to first automate picking up of tags that need a shadow dom built and secondly a way to automatically load it in at run time. The first bit is easy, we just need to add a data attribute to the tag we want to build a shadow dom for containing the template name.

<pre class="prettyprint">
   &lt;welcomer data-template="welcomer"&gt;trevor&lt;/welcomer&gt;
</pre>

Now we just need to adjust our JavaScript code to automate the whole process. I have used requirejs here to load the template in but you could use anything you want really.

<pre class="prettyprint linenums">
var templatedItems = document.querySelectorAll('[data-template]');
//iterate the templates
for(var i=0,il=templatedItems.length; i&lt;il; i++) {
	var item = "text!"  + templatedItems[i].getAttribute("data-template") + ".tmpl";
	require([item], function(templateHtml) {

		var template = document.createElement("div");
		template.innerHTML = templateHtml;
		//create a shadow Root
		var shadow = templatedItems[i].webkitCreateShadowRoot();

		//append the template
		shadow.appendChild(template.firstChild.content);
	});
}
</pre>

This code is grabbing all items with a data-template attribute, loading the template with that name via requireJs and then creating a shadow dom for that element and then loading the template into that dom.

##Can I use it

At the the time of writing only 35% of browsers have support and those that do have the webkit prefixed version. Not to mention the fact that the spec isn't fully finalised. So, not yet, although there is a [polyfill available here](https://github.com/Polymer/ShadowDOM).

##Useful links

* [w3c shadow dom spec](http://www.w3.org/TR/shadow-dom/)
* [Shadow Dom 101](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)
