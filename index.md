---
layout: pop-page
title: Vapid Space
tagline: Stuff that doesn't matter. Some stuff that does. Some stuff that falls down the crack.
---

<ul class="posts">
  {% for post in site.posts %}
    <li>

    	<h2><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h2>

    	<p>
    		{{ post.content | strip_html | truncatewords:50 }}
    	</p>

        
        <p>
            <strong>|</strong>
            {{ post.date | date_to_string }}
            <strong>|</strong>
            <a href="{{ BASE_PATH }}{{ post.url }}#disqus_thread"> 0 Comments</a>
            <strong>|</strong>
        </p>

    	<div class="end">
    		<a href="{{ BASE_PATH }}{{ post.url }}">Read Full Post <span class="glyphicon glyphicon-chevron-right"></span></a>
    	</div>
    </li>
  {% endfor %}
</ul>

<a href="archive.html" class="btn btn-default">Older</a>



