---
layout: post
category : coding
image: mocha.png
tags : [Node.js, Testing, Web]
---

A few months back I [wrote a post about getting code coverage stats with nodeunit](/coding/2014/01/31/code-coverage-metrics-with-nodeunit/). Since then I have moved a lot of my unit testing over to using [Mocha](http://mochajs.org/) as I prefer the syntax. I needed to get code coverage statistics for my tests again and it turned out to be a lot easier with Mocha. I'm just documenting it here so I don't forget and maybe someone else might find this useful.

##Code Coverage with Istanbul

So I'm assuming at this point you already have some Mocha spec's/test's that are passing. I have a test command set up in my package.json file that runs the following command:

	mocha tests/unit/

So to get code coverage on these tests you can use a really useful tool called [Istanbul](https://github.com/gotwarlost/istanbul). What this tool will do is run your tests and automatically intrument and calculate code code coverage on those tests. What you are essentially doing is passing the command to run your tests to Istanbul which in turn, will run those tests on your behalf. The command that I used to enable code coverage is shown below:

	istanbul cover _mocha -- tests/unit/ -R spec

Note the small changes to the original command. Firstly <code>mocha</code> has been changed to <code>_mocha</code> and the parameters are written after a <code>--</code>. [This issue](https://github.com/gotwarlost/istanbul/issues/44) documents the reasons behind it. Firstly the double dash tells istanbul that the parameters are for mocha and not istanbul. The underscore is to do with the internals of mocha and the way it handles the processes. From reading the issue mocha calls _mocha within a sub-process so it won't provide coverage by default. Calling it direct solves this problem

Once complete Istanbul will generate you an lcov file that you can send to services like [coveralls](https://coveralls.io/) and a html web page that details the percentage of your code that is covered and even the specific code lines that have been and hit and the ones that haven't.

##Using Sandboxed module with Istanbul

I make heavy use of a library called [Sandboxed module](https://github.com/felixge/node-sandboxed-module). This allows mocking of external dependencies without altering your code. I have talked about the use of it in a [previous blog post](/coding/2014/05/08/common-unit-testing-pitfalls/). Out of the box, when running your tests, your code will not be covered if it is loaded via SandboxedModule. Sandboxed module has Istanbul support out of the box that you can enable by running the following command before requiring your module.

	SandboxedModule.registerBuiltInSourceTransformer('istanbul');

By default though, at the point of writing this it will instrument all the files within your <code>node_modules</code> folder as well. You can stop this by writing your own transformer. The code I used is below.

<pre class="prettyprint linenums">
var IstanbulIgnoringTransformer = function(source) {
var coverageVariable, 
	istanbulCoverageMayBeRunning = false, 
	fromNodeModules = false;

Object.keys(global).forEach(function(name) {
  if((name.indexOf("$$cov_") === 0 || name === '__coverage__') &amp;&amp; global[name]) {
    istanbulCoverageMayBeRunning = true;
    coverageVariable = name;
  }
});

if (this.filename.match(/node_modules/)) {
  fromNodeModules = true;
}

if(istanbulCoverageMayBeRunning &amp;&amp; !fromNodeModules) {
  try {
    var istanbul = require('istanbul'),
        instrumenter = new istanbul.Instrumenter({coverageVariable: coverageVariable}),
        instrumentMethod = instrumenter.instrumentSync.bind(instrumenter);
    source = instrumentMethod(source, this.filename);
  } catch(e) {}
}
return source;
};
</pre>

You can then attach the transformer to your code when you require the method as shown below.

<pre class="prettyprint linenums">
	store = sandboxedModule.require('mycode.js', {
      requires: {
      },
      sourceTransformers: {
        "customInstanbul" : customIstanbulTransformer
      }
</pre>

##Sending to Coveralls

I have previously documented how to do this with [Nodeunit here](/coding/2014/01/31/code-coverage-metrics-with-nodeunit/). First things first you need to install the node coveralls module with the following command:

	npm install coveralls --save-dev 

As part of the code coverage generation done through istanbul an lcov file will be generated. So uploading to coveralls is just a matter of running the following command:

	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

If your running this through travis then this will work straight away but if your doing it locally then you need to add your coveralls api key into your environment variables. The following is required as a minimum:

- COVERALLS_REPO_TOKEN (the secret repo token from coveralls.io) 

The [full list can be found here](https://github.com/cainus/node-coveralls).

Now that's all working you can, if you like, adjust your original command to do it all in one go with the following command:

	istanbul cover _mocha -- tests/unit/ -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

That should be that. Code coverage with Mocha and Istanbul. Hope it helps somebody.
