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

- A html page (This is what node-webkit will render inside the window).
- ap package.json file. This holds information for Bootstrapping the application. e.g. the start page, window options etc.

###Security

It is probably woth noting the majority of all the usual security checks that the browser performms have been removed from node-webkit. As you would expect you have full access to the file system and cross domain requests are all fine so it may be worth adding some of your own checks if needs be. 

