---
layout: post
category : coding
tags : [Node.js, Testing, Web]
image: selenium.png
---

Selenium is a great tool for performing automated integration or acceptance testing on your web applications with drivers developed for all the main browsers. I wanted to go one step further and see if I could integrate it into the build process so that regressions would get picked up earlier.

I though about integrating the tests to run on every build after the unit tests but I decided against this for two main reasons.

- The unit tests are not relying on any outside dependencies so should be less prone to error whereas the Selenium tests are going to be a lot more prone to environmental problems and we don't really want the build failing because a server has gone down.
- These test generally are going to take a lot more time to run and we really dont want to slow down the build if possible.

The first step is to get the Selenium server up and running.

##Setting up the Selenium Server

The selenium server is a jar file that can be run cross platform. It can be downloaded from the [selenium website](https://code.google.com/p/selenium/downloads/list). You can then run the Selenium server with the command

    java -jar path/to/your/selenium.jar

You will also need to download all the web drivers that you are going to need and ensure theat they are in you PATH. Once installed and running you can then use the <code>webdriverjs</code> to connect to and control selenium. A brief overview can be found [here](https://code.google.com/p/selenium/wiki/WebDriverJs)

##Writing a Test

As mentioned previosuly Selenium already provides a web driver for Node called WebDriverJs. First things first you are going to want to install this into your project with

    npm install selenium-webdriver --save-dev

Once thats installed you can go about writing your first test. You can already create tests that can be run with mocha by requiring the testing library within the web driver. This is a sample test:

<pre>
var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

function writeScreenshot(data, name) {
    name = name || 'ss.png';
    var screenshotPath = '/';
    fs.writeFileSync(screenshotPath + name, data, 'base64');
};

test.describe('Vapid Space', function() {
    test.it('should show home page', function() {

        var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

        driver.get('http://www.vapidspace.com');


        driver.takeScreenshot().then(function(data) {
            writeScreenshot(data, 'out1.png');
        });

        driver.quit();
    });


</pre>

This is a simple test that navigates to this home page with chrome and then takes a screenshot. The Selenium api is based on promises so each task will be run once the previous one has completed so you needn't get into callback hell. You will need to install mocha to run the tests. The easiest way to do this is to run

    npm install -g mocha

Once installed you can run <code>mocha ./tests.js</code>. More information on what you can do with mocha is available [here](http://visionmedia.github.io/mocha/). You should now have a selenium test running from the command line. The next step is to try and automate sets of these tests so that they can be triggered by an external event, be it a time, a checkin to your repository or when the doorbell goes.

##Automating Running of tests

You can automate the execution of your tests using the [grunt-webdriver](https://github.com/webdriverjs/grunt-webdriver) tool. This will take your mocha tests and run them in within Grunt. The README file is pretty comprehensive and basically requires adding the follwing to your Grunt config.

<pre>
grunt.initConfig({
  webdriver: {
    options: {
        desiredCapabilities: {
            browserName: 'chrome'
        }
    },
    sometests: {
        tests: ['test/spec/login/*.js']
    }
  },
})

grunt.loadNpmTasks('grunt-webdriver');
</pre>

You should now have your selenium tests running through Grunt. If you want to go one step further and it makes sense to do so, you can also check the ouput screenshot against reference renders.

##Checking Screenshots against reference examples

It is possible to check the output screenshots against reference renders. Whilst with dynamic content and altering pages it is not always logical to do this, if you have pages that you know won't change, it may be useful. To do this you can use a tool developed by the BBC called [wraith](https://github.com/bbc-news/wraith). Wraith is a screenshot comparison tool that will output diffs between two images, allowing you to quickly see any differences between renders. To use it you just need to install it with:

    gem install wraith

The [setup information can be found here](http://bbc-news.github.io/wraith/index.html). Once installed you can then compare screenshots with

    wraith compare_images

You should now be automating your Selenium tests and doing all sorts of other stuff with the results if you want. If you do something cool, let me know.
