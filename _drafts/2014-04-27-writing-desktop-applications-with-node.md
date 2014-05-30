---
layout: post
category : coding
tags : [Node, Desktop, JavaScript]
image: node-webkit.png
---

I recently found out about node-webkit. A project intended to allow developers to write cross-platform desktop apps by combining
webkit and node.js. This allows you to use traditional js/css/html but with the added ability to call node librarys from within the client side code. As a node developer this sounded too good to be true so I set about writing a simple desktop application as a
proof of concept. I decided to start with an image viewer so I could test the file io and the ui.

### Getting Started.

To start with you want to download the <code>node-webkit</code> binaries for your chosen platform(s) [here](https://github.com/rogerwang/node-webkit). Once you have the runtime downloaded you can now begin writing your application. The two basic components each application needs are :

- a package.json file. This holds information for Bootstrapping the application. e.g. the start page, window options etc.
- Markup (This is what node-webkit will render inside the window).

First thing to do is to set up your package file. Below is my package file.

<pre class="linenums prettyprint">

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

The most important properties to set are the name and main property with main being the html file you want your app to show by default. The window object also lets you specify some settings on the window itself.

There are more properties available. The full documentation of the package file can be found [here](https://github.com/rogerwang/node-webkit/wiki).

### Calling node libraries from your markup

When you want to use a node library you just need to require it in your javascript as you would in node. So for example saving a file when  save button is clicked could be done like this:

<pre class="prettyprint linenums">
$('#saveButton').click(function() {
  var canvasImage = canvas.toDataURL("image/png").split(',')[1],
      decodedImg = window.atob(canvasImage),
      img = new Buffer(decodedImg, encoding='base64'),
      fs = require("fs");
  fs.writeFile("output.png", img, function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("The file was saved!");
      }
  });

});
</pre>

<div class="alert alert-info">
It is probably worth noting the majority of all the usual security checks that the browser performs have been removed from node-webkit. As you would expect you have full access to the file system and cross domain requests are all fine so it may be worth adding some of your own checks if needs be.
</div>

### Running your application

To run your application the easiest way is on mac/linux to open up your bash profile in your favourite editor (<code>nano bash_profile</code> does it for me) and add the following line:

<pre>
alias nw='/Applications/node-webkit.app/Contents/MacOS/node-webkit'
</pre>

or on windows add the node-webkit folder into your machines PATH variable.

Once you have done that call <code>nw</code> (or the name of the node-webkit exe on windows) with no parameters to test this. The default node-webkit application should now show. You can then pass the folder your code and package files reside in as an argument to run your app. For example to run my app I run:

<pre>$ nw picturesque/</pre>

You can also package your application up as a zip file and it will also take that:

<pre>$ nw picturesque.zip</pre>

### Debugging

At some point you are probably going to want to debug your application. As this is basically repackaged Chromium you can just use the built in dev tools. At the time of writing this the dev tools aren't perfect but are better than nothing. There are two ways in which you can get the dev tools window open.

1.  #### Through the GUI.

    Add the property:

    <pre class="linenums prettyprint">
    {
       "window" : {
          "toolbar: "true
       }
    }</pre>

    to your package.json file. This will add a toolbar to your application which will allow you to open up the dev tools.

2.  #### Through code.

    You just need to run the line:

    <pre class="prettyprint">require('nw.gui').Window.get().showDevTools();</pre>

    A nice way that I have seen this implemented is to hook into the global onerror event and show the dev tools when an unhandled error occurs:

    <pre class="linenums prettyprint">
    window.onerror = function() {
       if (debugMode) {
          require('nw.gui').Window.get().showDevTools();
       }
    };</pre>


### Packaging your application

When deploying your application chances are your not going to want to want users to install node-webkit as a prerequisite you just want to give them a file that they can install and your done. There are some instructions on how to do this on the wiki [here](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps). For osx it requires modification of the nw.app in three places.

1. Adding your application zip or folder into the <code>Contents/Resources</code> folder with the name app.nw. It will automatically be run when the executable is executed.

2. Editing the icons in <code>Contents/Resources/nw.icns</code> to use your icons instead od the node webkit defaults.

3. Editing the <code>Contents/Info.plist</code> file to use your application details rather than the node-webkit ones. The main keys and values you will be interested in are

    - CFBundleName. The string that is used in the menu bar when your application is active.
    - CFBundleShortVersionString. Displays the shortened version string. Useful as a more user friendly version number than the BundleVersion.
    - CFBundleVersion. Displays the build version of your application.
    - NSHumanReadableCopyright. String value you want displayed as the copyright.


Thats it. A multi-platform desktop application using node. If I have missed anything or have something more to add then let me know.
