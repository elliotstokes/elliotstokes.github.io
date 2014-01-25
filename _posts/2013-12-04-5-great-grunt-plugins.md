---
layout: post
category : coding
tags : [Web, JavaScript, Testing]
image: gruntLogo.png
---

I have been using Grunt quite a lot recently and really love the sheer volume and variety of Grunt plugins that have been developed. I thought I would pick a few that I really like and that others might not have heard of and may find useful. 

##[grunt-uncss](https://github.com/addyosmani/grunt-uncss)

This plugin is really useful if you are trying to really get your site performing well on low bandwidth connections. You define your css files and a set of html pages that you would like to check for unused classes. It then parses the html files for unused css classes and prunes all the css classes out of your files that your page isn't using. Not a big deal you may say. Well, if you use the audit functionality built into chrome on my front page, which is just referencing the bootstrap default css and a few customisations you will see I am not using 94% of the css defined.

<img src="{{ site.url }}/assets/images/cssAudit.png" class="img-responsive"/>

It can even detect css classes being attached at run time.

The example specified on the project page managed to reduce the css payload from 120kb down to just 11.

##[jshint](https://github.com/gruntjs/grunt-contrib-jshint)

A tool used by many which detects well known coding errors and non standard syntax. The same code wrapped in a Grunt plugin so you can run it on deployment.


##[grunt-responsive-images](https://github.com/andismith/grunt-responsive-images)

Takes your images and creates a set of resized versions of the original image. Really useful if you have implemented a responsive image solution on your web page/application.

##[jsdoc](https://github.com/krampstudio/grunt-jsdoc)

JsDoc is a great tool that parses your source files and checks for specially formatted comment blocks. It then uses them to generate html documentation for your code.

This project has wrapped this up within a grunt plugin so that you can build your documentaion on every build ensuring it is always up to date.

##[grunt-complexity](https://github.com/vigetlabs/grunt-complexity)

Evaluates the complexity and maintainability of your code using standard metrics like [cyclometric complexity](http://en.wikipedia.org/wiki/Cyclomatic_complexity). I find it useful to get an idea when certain methods and classes are due for refactor.

<img src="{{ site.url }}/assets/images/complexExample.png" class="img-responsive"/>

If none of these tickle your fancy then check out the [Grunt plugins page](http://gruntjs.com/plugins) or [write one yourself](http://gruntjs.com/creating-tasks).