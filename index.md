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

    	<p>
    		{{ post.content | strip_html | truncatewords:50 }}
    	</p>

        
        <p>
            {{ post.date | date_to_string }}
            <strong>|</strong>
            <a href="{{ BASE_PATH }}{{ post.url }}#disqus_thread"> 0 Comments</a>
        </p>

    	<div class="end">
    		<a href="{{ BASE_PATH }}{{ post.url }}">Read Full Post&gt;&gt;</a>
    	</div>
    </li>
  {% endfor %}
</ul>

<a href="archive.html" class="btn btn-default">Older</a>



