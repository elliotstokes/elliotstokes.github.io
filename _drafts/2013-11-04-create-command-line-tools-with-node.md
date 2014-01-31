---
layout: post
category : coding
tags : [Node.js, JavaScript]
---

One of the lesser known features of Node is the ability to write command line utilities. This article aims to write up how to go about creating and testing your command line utility.

Starting with a blank folder cd into it and then run:

	npm init

Fill in all the details and when it finished you should be left with a basic <code>package.json</code> file. 


##Testing

Whilst your unit tests will test your application logic you are probably going to want to run your task from the command line just to check it end to end before you publish it to npm. You can simulate a <code>-g</code> installation using npm. Within the root directory of your project run

	npm link

Depending on platform i.e. mac, linux you will probaly have to prefix that with a <code>sudo</code>. This creates a symbolic link to your project from the global package location. You should then be able to run your command anywhere. 

<div>
In windows you may need to close your console window down and re-open it for the changes to take effect
</div>

You can then remove the link once you have finished by running unlink from your project folder:  

	npm unlink



