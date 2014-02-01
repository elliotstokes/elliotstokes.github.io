---
layout: post
category : coding
tags : [Node.js, JavaScript]
---

One of the lesser known features of Node is the ability to write command line utilities. This article aims to document the basics on how to go about creating and testing your command line utility.

##Setting up your project

Starting with a blank folder cd into it and then run:

	npm init

Fill in all the details and when it finished you should be left with a basic <code>package.json</code> file. You will then need to add a few extra bits to the file. Add the following lines to your file:

<pre>
preferGlobal : true,
bin : {
	"yourcommandname" : './bin/yourcommandname'
}
</pre>

The <code>preferGlobal</code> pretty much does what it says and springs up a warning if somebody tries to install it without the <code>-g</code>. The bin section defines which command runs what files.

Once thats in there create a bin directory and a file called <code>yourcommandname</code>. The skeleton of the file should look something like this:

<pre>
#!/usr/bin/env node

var applogic = require('../lib/applogic');

process.title = 'My App';

appLogic.runSomething("stuff", function(error, result) {
	
	if (error) {
		console.log("error");
	} else {
		console.log("done");
	}
	

	process.exit(error ? 1 : 0);
});


</pre>

The top line is to get the script to be executed by node, from then on its just standard stuff. Whilst it isn't essential it's still worth moving your application logic to a lib folder so that you can unit test it easier. When you are done you can return a 1 or a 0 to specify pass or fail.


##Parameter Passing

You can also pass parameters into the script. To grab the variables within your script you can use process.argv. This holds an array of all the space seperated parameters input into your script. So, the command:

	command these are my params=yesh

will return an argv array with 4 items: <code>['these', 'are', 'my', 'params=yesh']</code>. There are also some libraries around that make it easier if that's what your after. Take a look at [Optomist](https://github.com/substack/node-optimist).

##Console Colo[u]r

Everybody loves colours right? The easiest way to do that is to use the [colors](https://github.com/marak/colors.js/) module. To install:

	npm install colors

Then to output colors to the console just specify the color in the log method

	console.log("This is red".red);

It also allows you to define chain modifications with commands like:

	console.log("This is bold and colourful".bold.rainbow);

That's the colours sorted. Now your probably going to want to run it.

##Testing

Whilst your unit tests will test your application logic you are probably going to want to run your task from the command line just to check it end to end before you publish it to npm. You can simulate a <code>-g</code> installation using npm. Within the root directory of your project run

	npm link

Depending on platform i.e. mac, linux you will probaly have to prefix that with a <code>sudo</code>. This creates a symbolic link to your project from the global package location. You should then be able to run your command anywhere. 

<div class="alert alert-warning">
In windows you may need to close your console window down and re-open it for the changes to take effect
</div>

You can then remove the link once you have finished by running unlink from your project folder:  

	npm unlink

There you have it. If you use this and make loads of money, make sure you give me some.

