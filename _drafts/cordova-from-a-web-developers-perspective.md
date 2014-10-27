---
layout: post
category : coding
image: cordova.png
tags : [Mobile, JavaScript]
---

We all make responsive web sites nowadays and for a new project I was working on I needed to make a multi-platform mobile application. Cordova was the obvious choice for the skills that I have. I wrote this post just to keep a note of some of the tools and technology I used and the thought processes I went through in choosing them.

##Differences between Cordova & Phonegap

A common query I hear a lot is. What is Cordova and how is it different to PhoneGap. My understanding is originally Adobe developed Phonegap and as they did with flex, in late 2011 dontated the codebase to Apache to maintain. At this point Adobe kept hold of the Phonegap name, so Apache needed to come up with a new name. So you can think of Phonegap as a distribution of Cordova, similar to how Safari uses webkit.

##Accessing native functions through Cordova

So, you have your user interface written in html. How do you access some of the devices hardware? How does it work?

Within a Cordova application you have a webview which is occupying the full screen of the device. This is where the html, js and css is rendered, all good so far. Hardware and native functionality from the device is split up into plugins. Each plugin provides a partiular native function, for example the [Camera plugin](https://cordova.apache.org/docs/en/3.0.0/cordova_camera_camera.md.html) provides, you guessed it, function calls to use the camera.

A Cordova plugin is made up of two parts. The JavaScript public api that is called by the application developer and the back end native code that is called when that plugin is invoked. For Example making use of the camera in a Cordova application is done via this call.

<pre class="prettyprint linenums">

</pre>

So you have your back end Objective-c or Java code for the plugin and a JavaScript method that invokes it. How does the JavaScript call make it's way to the native code and then back again. This is done by creating a specially encoded request that is intercepted via the Cordorva application and is then routed through to the correct plugin. The application then polls for a response or it is returned asynchronously to the calling application's web view. For more information you can see the [android implementation here](https://github.com/apache/cordova-js/blob/master/src/android/exec.js) and the [ios implementation here](https://github.com/apache/cordova-js/blob/master/src/ios/exec.js). As you can see the implementation varies for each platform.

<img src="{{ site.url }}/assets/images/phonegap_plugins.png" class="img-responsive"/>


##Differences between web and hybrid development

Whilst you are still technically developing a web page using your standard technologies of html,js and css. There are a few things to consider.

- All apps have to be single page applications. 

##Ionic

I decided to use Ionic as it automated some of the simple tasks for me and provided some out of the box templates to get you going.


Phonegap build
