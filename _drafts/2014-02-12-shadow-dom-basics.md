---
layout: post
category : coding
tags : [Web, Html5, JavaScript]
---

Chrome has now supported the Shadow Dom spec since version 25/26. I thought it was about time to have a look at it and the problems it aims to solve. A common-or-garden web page exists as one big global dom tree where each element is free to interact and alter each other. Whilst this is good, sometimes you don't want this. When writing web applications it is generally good practice to componentise your code and the idea of encapsulating the style and markup into a seperate dom tree, away from the reaches of over the top css selectors sounds really appealing. That's really the reason for shadow dom. 

<div class="alert alert-warning">Whilst shadow dom allows components to be encapsulated it's not really a security thing and shouldn't be treated as such.</div>

##Basic example

So it's probably worth seeing an example. If we take the markup:

<pre>
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

<pre>
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

	shadowRoot.applyAuthorStyles = true;


##Loading the templates via Ajax

In the simple example above the template was held as part of the page. Generally speaking things would be easier to maintian and understand if the template could be split out into a seperate file and loaded in at startup or whenever it was needed.

##Can I use it

At the the time of writing 35% of browsers have support and those that do have the webkit prefixed version. Not to mention the fact that the spec isn't fully finalised.

##Useful links

* [w3c shadow dom spec](http://www.w3.org/TR/shadow-dom/)