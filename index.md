---
layout: page
title: My Blog
tagline: Stuff that doesn't matter.
---


## Welcome

This is my blog.
    
## Posts

<ul class="posts">
  {% for post in site.posts %}
    <li>

    	<h3><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h3>

    	<p>
    		{{ post.content | strip_html | truncatewords:20 }}
    	</p>

    	<span>{{ post.date | date_to_string }}</span>
    </li>
  {% endfor %}
</ul>



