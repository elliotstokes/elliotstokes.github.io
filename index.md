---
layout: pop-page
title: Vapid Space
tagline: Stuff that doesn't matter. Some stuff that does. Some stuff that falls down the crack.
---
    
## Latest Posts

<ul class="posts">
  {% for post in site.posts %}
    <li>

    	<h3><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h3>
    	<span>{{ post.date | date_to_string }}</span>

    	<p>
    		{{ post.content | strip_html | truncatewords:50 }}
    	</p>

    	<div>
    		<a href="{{ BASE_PATH }}{{ post.url }}">Read Full Post&gt;&gt;</a>
    	</div>
    	
    </li>
  {% endfor %}
</ul>



