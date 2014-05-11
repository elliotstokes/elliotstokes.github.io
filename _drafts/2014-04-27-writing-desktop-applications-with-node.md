---
layout: post
category : coding
tags : [Node, Desktop, JavaScript]
image: node-webkit.png
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

<div class="alert alert-info">
It is probably woth noting the majority of all the usual security checks that the browser performms have been removed from node-webkit. As you would expect you have full access to the file system and cross domain requests are all fine so it may be worth adding some of your own checks if needs be.
</div>

###Running your application

To run your application the easiest way is on mac/linux to open up your bash profile in your favourite editor (<code>nano bash_profile</code> does it for me) and add the following line:

<pre>
alias nw='/Applications/node-webkit.app/Contents/MacOS/node-webkit'
</pre>

or on windows add the node-webkit folder into your machines PATH variable.

Once you have done that call <code>nw</code> (or the name of the node-webkit exe on windows) with no parameters to test this and the default node-webkit application should show. You can then pass the folder your code and package files reside in as an argument to run your app. For example to run my app I run:

<pre>$ nw picturesque/</pre>

You can also package your application up as a zip file and it will also take that:

<pre>$ nw picturesque.zip</pre>

###Debugging

At some point you are probably going to want to debug your application. As this is basically repackaged Chromium you can just use the built in dev tools. At the time of writing this the dev tools aren't perfect but are better than nothing. There are two ways in which you can get the dev tools window open.

1. Through the GUI. add the property:

<pre>
{
  "window" : {
    "toolbar: "true
  }
}
</pre>

to your package.json file. This will also add a toolbar to your application.

2. Through code. Just call the line

<pre>require('nw.gui').Window.get().showDevTools()</pre>

when you want to open them.

###Packaging your application

When deploying your application chances are your not going to want to want users to install node-webkit as a prerequisite you just want to give them a file that they can install and your done.


Thats it. A multi-platform desktop application using node.
