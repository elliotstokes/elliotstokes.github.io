---
layout: post
category : coding
tags : [Web, Mobile]
image: chrome.png
---

Imagine the scenario. I have a new site. I have a bug with my css that shows itself only on mobile browsers and I need to debug it and fix it. My current workflow is:

* Upload a possible fix.
* Clear the cache
* Check Again.
* It still doesn't work properly.
* Repeat.

There must be a better way! There is a better way. I have just finished setting up remote debugging on Chrome for Android and thought it would be useful to write up how I did it.

The first thing you need to do is install the android SDKs. You can download the SDKs from here. You need the Android Debug Bridge (adb) to connect to the phone, so once you have the SDK downloaded then need to install the platform-tools package. To get it just run the Android package manager (&lt;sdkinstall&gr;/tools/android) that comes with the SDK and download the platform-tools package. The screenshot below shows the package.

<img src="{{ site.url }}/assets/images/sdk.png" class="img-responsive"/>


Once you have the package installed you should have the adb executable in your &lt;sdkinstall&gt;/platform-tools folder. Once your sure everything is installed then you need to get your device ready by firstly enabling USB debugging. I'm running ICS and you can find the option under Developer options.

<img src="{{ site.url }}/assets/images/allowDebug.png" class="img-responsive"/>

Once you have turned it on then you need to enable USB web debugging in chrome. This option can be found in settings/Developer Tools.

<img src="{{ site.url }}/assets/images/enableUsb.png" class="img-responsive"/>

Now you can connect your device to your machine. To check your device is connected ok you can run adb with the devices flag:

<pre>
./adb devices
</pre>

This should list all of your devices currently connected and should return something like:

<pre>
Macbook:platform-tools elliotstokes$ ./adb devices
List of devices attached
0029hde63ggcae	device
</pre>

Once your sure your device is connected you need to run:

<pre>
./adb forward tcp:9222 localabstract:chrome_devtools_remote
</pre>

This command then lets you browse currently open web pages in Mobile Chrome in a chrome instance on your desktop. To do this open up chrome and browse to http://localhost:9222 and you should see a screen like this

<img src="{{ site.url }}/assets/images/webView.png" class="img-responsive"/>

Then just click on the site you wish to debug and watch the awesomeness.

<img src="{{ site.url }}/assets/images/webDebugView.png" class="img-responsive"/>

Your debugging the website on your phone!
