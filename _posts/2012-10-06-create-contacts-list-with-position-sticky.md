---
layout: post
category : coding
tags : [Web, Css]
---

I recently read that webkit/chrome have just implemented support for position:sticky so I thought I would have a go at writing something quick to see it in action. Whilst scrolling through my contacts list on my mobile I realised that Android uses a sticky header to separate contacts so I decided to use this as the basis of my demo. Whilst this concept isn't a new one, traditionally this has been done by hooking into the scroll events in JavaScript which isn't ideal.Sticky isn't currently (at the time of writing) part of the css3 specification so it is unclear how well adopted this will be and currently you will need a beta version of chrome with the Enable experimental WebKit features flag turned on.

##Pre-flight Checks

If you are going to try this for yourself then you will probably need to enable Enable experimental WebKit features. To do this type about:flags into the address bar and enable the experimental features. Once thats done things should stick nicely.

<img src="{{ site.url }}/assets/images/flags.png" class="img-responsive"/>

##Markup and Css

The basic functionality of the position:sticky; attribute is to fix the position of the element whilst the parent element is scrolled. It will start to take effect once the element meets the position specified in your css. Take the markup below:

<pre>
&lt;div class="section"&gt;
    &lt;span class="header"&gt;
      &lt;h2&gt;A&lt;/h2&gt;
    &lt;/span&gt;
&lt;/div&gt;
</pre>

and the css

<pre>
div.section span.header {
    position: -webkit-sticky;
    position: -moz-sticky;
    position: -o-sticky;
    position: -ms-sticky;
    position: sticky;
    top:0;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
  }
</pre>

If you apply the position:sticky style to the header class then whilst the section div remains on screen it will remain at the position specified when the page is scrolled. In the case of my example I have specified top:0 to make it stick to the top but you can use either top, bottom, left or right.

The screenshot below demonstrates this.

<img src="{{ site.url }}/assets/images/sshot.png" class="img-responsive"/>

The other great thing about using this is that it degrades really nicely. If the browser doesn't support sticky then it just acts like a normal element. I have uploaded it if you want to see it action.
