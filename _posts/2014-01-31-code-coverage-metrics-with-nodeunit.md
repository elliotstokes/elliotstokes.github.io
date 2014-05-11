---
layout: post
category : coding
tags : [Node.js, Testing, Web]
---

Code coverage is a really useful metric when it comes to assessing how confident you are that your users will not hit any major bugs when they run the code. Getting code coverage stats with Node.js is seen as quite hard so I wanted to see if I could get it working with a project I had written.

<div class="alert alert-warning">
Whilst code coverage is a good measure, I don't think it should be the only metric you use. Imagine you were testing a road network in a new town. To test the road network you take a car and you drive down every road in the town. Brilliant. The roads are all tested and working. First day the road opens a lorry drives down a road and gets stuck under a bridge. Just because every line of code is executed, it doesn't mean that your code has no bugs.
</div>

##Setup

Now that's out of the way. Let's see if we can set this up. The main steps involved are:

- Instrument the code with JsCoverage.
- Make changes to your code to use the instrumented code when computing coverage.
- Setup Nodeunit to use the lcov reporter and the instrumented code when computing code coverage.
- Optionally automate it with Travis and coveralls.io.

If you find it easier you can [look at this project](https://github.com/elliotstokes/gpx-parse) that is creating code coverage results.

###Instrumenting your code

<div class="alert alert-info">
I am making the assumption that all the code you want to instrument is in a lib directory. If it isn't then you will need to adjust what you are doing accordingly.
</div>

The first thing you are going to need is jscoverage. You can install this with:

	$ npm install jscoverage --save-dev

Once that is installed run it on your code with:

	$ jscoverage lib

If it is successful then it should have created a folder called <code>lib-cov</code>.

###Altering Entry Points

Now we have all the instrumented code we need a mechanism to provide the instrumented code when we are computing code coverage metrics but the real code at all other times. The method which seems to be used widely is to define an environment variable say <code>MYAESSOMEPROJ_COV</code> and set it to 1 when you want to use instrumented code. Then in your main entry point for your library check for this variable and return the instrumented code if it is set. My example is below:

<pre class="prettyprint linenums">
module.exports = process.env.GPXPARSE_COV
  ? require('./lib-cov/gpx-parse')
  : require('./lib/gpx-parse')
</pre>

###Putting it all together

Now you should have some tests that you are running through nodeunit with command along the lines of:

	$ nodeunit tests

To compute code coverage of these tests edit that command and run:

	$ GPXPARSE_COV=1 nodeunit --reporter=lcov tests

This is calling the same tests but setting the env variable before running the command and specifically setting the reporter to be lcov. You can go one step further and re-compute the instrumented code everytime by running:

	$ jscoverage lib && GPXPARSE_COV=1 nodeunit --reporter=lcov tests

After completion the coverage reports should be output to the screen in lcov format.

###Automating with Travis and coveralls.io

It is also possible, if you want to automate the coverage tests within Travis, sending them to coveralls.io which will track your coverage percents and give you a badge that you can stick in your README.md file. To get your code coverage to register with coveralls you need to link your GitHub account with coveralls. Once that's done install the coveralls node module:

	$ npm install coveralls --save-dev

Once coveralls is safely nestled in the dev dependencies section of your <code>package.json</code> file add a new line into your scripts section of the package.json file to run the code coverage:

<pre class="prettyprint linenums">
"scripts": {
   "test": "node_modules/.bin/nodeunit tests/",
   "coveralls": "jscoverage lib &amp;&amp; GPXPARSE_COV=1 nodeunit --reporter=lcov tests | coveralls"
}
</pre>

This is the same command we running before except we are piping it into coveralls. If your running this locally then you need to add the coveralls api key into an environment variable. If you are running it through Travis then you don't need to bother.

If you are running it through Travis then you just need to make one final change to your <code>.travis.yml</code> file. Add an after script block and run the command we added in the scripts section of the package.json file like this:

<pre class="prettyprint linenums">
after_script:
  - npm run coveralls
</pre>

Check it all in and you should then have code coverage metrics automatically calculated every build.
