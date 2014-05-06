---
layout: post
category : coding
tags : [Node, Desktop, JavaScript]
---

I recently found out about node-webkit. A project intended to allow developers to write cross-platform desktop apps by combining
webkit and node.js. This allows you to use traditional js/css/html but with the added ability to call node librarys from within the client side code. As a node developer this sounded too good to be true so I set about writing a simple desktop application as a
proof of concept. I decided to start with an image viewer so I could test the file io and the ui.

###Getting Started.

To start with you want to download the <code>node-webkit</code> binaries for your chosen platform(s) [here](https://github.com/rogerwang/node-webkit). Once you have the runtime downloaded you can now begin writing your application. The two basic components each application needs are :

- a package.json file. This holds information for Bootstrapping the application. e.g. the start page, window options etc.
- Markup (This is what node-webkit will render inside the window).

First thing to do is to set up your package file. Below is my package file.

<pre>

{
  "name": "PictureViewer",
  "main": "index.html",
  "version" : 0.4,
  "description" : "image viewer written with node and node-webkit",
  "window" : {
  	"title" : "Image Viewer",
  	"icon": "icon.png",
  	"toolbar" : false,
  	"frame" : true
  }
}
</pre>

The most inportant properties to set are the name and main property with main being the html file you want your app to show by default. The window object also lets you specify some settings on the window itself.

There are more properties available. The full documentation of the package file can be found [here]().

###Calling node libraries from your markup

###Running your application

###Security

It is probably woth noting the majority of all the usual security checks that the browser performms have been removed from node-webkit. As you would expect you have full access to the file system and cross domain requests are all fine so it may be worth adding some of your own checks if needs be. 

###Packagin your application
