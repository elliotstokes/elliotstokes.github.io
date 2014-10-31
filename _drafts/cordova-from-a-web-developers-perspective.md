---
layout: post
category : coding
image: cordova.png
tags : [Mobile, JavaScript]
---

We all make responsive web sites nowadays and for a new project I was working on I needed to make a multi-platform mobile application. Cordova was the obvious choice for the skills that I have. I wrote this post just to keep a note of some of the tools and technology I used and the thought processes I went through in choosing them.

##Differences between Cordova & Phonegap

A common source of confusion and something I hear a lot is: What is Cordova and how is it different to PhoneGap? My understanding is Phonegap was originally developed by Adobe and as they did with flex, donated the codebase to Apache to maintain in 2011. At this point Adobe kept hold of the Phonegap name, so Apache needed to come up with a new name - Cordova. So you can think of Phonegap as a distribution of Cordova, similar to how Safari uses webkit. At the point of writing this Phonegap and Cordova are identical but there is nothing stopping Adobe using the base Cordova codebase and augmenting it with their own tech at some point.

##How Cordova Works

Cordova applications make use of exisitng web technologies to build mobile apps but differ from mobile web applications in that they allow access to the devices's hardware.

Within a Cordova application you have a native WebView which is occupying the full screen of the device and acts as the container for your app. This is where the html, js and css is rendered. Hardware and native functionality from the device is split up into plugins. Each plugin provides a partiular native function, for example the [Camera plugin](https://cordova.apache.org/docs/en/3.0.0/cordova_camera_camera.md.html) provides, you guessed it, function calls to use the camera and grab images.

A Cordova plugin is made up of two parts. The JavaScript public api that is called by the application developer and the back end native code that is called when that plugin is invoked. All native functionality is called via the Javascript api, for Example making use of the camera in a Cordova application can be done via this call.

<pre class="prettyprint linenums">
navigator.camera.getPicture(
    function(imgData) {
          var image = document.createElement('img');
          image.src = "data:image/jpeg;base64," + imgData;
          _this.attachments.append(image);
    },
    function() {
    	console.log('and error has occurred');
    }, {
      quality: 20,
      destinationType: Camera.DestinationType.DATA_URL
    }
);
</pre>

So you have your back end Objective-c or Java code for the plugin and a JavaScript method that invokes it. How does the JavaScript call make it's way to the native code and then back again. This is done by creating a specially encoded request that is intercepted via the Cordorva application and is then routed through to the correct plugin. The Cordova application then sends a response or the calling application's web view. For more information you can see the [android implementation here](https://github.com/apache/cordova-js/blob/master/src/android/exec.js) and the [ios implementation here](https://github.com/apache/cordova-js/blob/master/src/ios/exec.js). As you can see the implementation varies for each platform.

<img src="{{ site.url }}/assets/images/phonegap_plugins.png" class="img-responsive"/>


##Differences between web and hybrid development

Whilst you are still technically developing a web page using standard web technologies with Html, JavaScript and Css there differences. These are some of the main things I think are worth mentioning:

- All apps should be single page applications. The main reason for this is that all apps must wait for the <code>deviceready</code> event before any functionality can be used. Also every time a web page is loaded into the WebView it will need to load all the scripts you have again. Using seperate pages will reduce the speed of your application significantly.

- Offline. In general, it is very rare (although it is becoming more of a thing) for a web site/application to need to work offline. It's more normal for mobile apps, especially tablet apps to work offline and your application should be able to handle this. The browser [Network Information api](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API) is not supported much at the moment but luckily there is the [Network Information cordova plugin](http://plugins.cordova.io/#/package/org.apache.cordova.network-information) to make things a bit easier.

- Touch Events. Whilst most platforms are starting to remove or at least shorten the delay, there is usually a delay of about 300ms before click events are fired on mobile WebViews. Using the touch events instead removes the delay which in turn will make your application more responsive, which is awlays a good thing.

##Getting Cordova

If you have node and npm installed then installing Cordova is really simple. Just run the command:

    $ npm install -g cordova ios-sim

Once cordova has installed it will give you a command line tool that will allow you to do everything you need. For example creating an ios app with camera support can be acheived with the following commands:

    $ cordova create myapp com.example.MyApp
    $ cd myapp
    $ cordova platform add android
    $ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-camera.git
    $ cordova build
    $ cordova emulate ios

After running the last command you should see the ios emulator with the default cordova application showing.

##Ionic Framework

[Ionic](http://ionicframework.com/) is a framework that sits on top of Cordova. I decided to use Ionic as it automated some of the simple tasks for me and provided some out of the box styles that were useful. Ionic takes Cordova and adds some extra tools and styles to make development easier. It uses sass for the styles and automatically sets up gulp to compile them. To install it run

    $ npm install -g ionic

Then creating a basic application with a side menu is just a matter of running:

    $ ionic start myApp sidemenu
