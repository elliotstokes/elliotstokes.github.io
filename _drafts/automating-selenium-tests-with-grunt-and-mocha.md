---
layout: post
category : coding
tags : [Node.js, Testing, Web]
---

Selenium is a great tool for performing automated integration or acceptance testing on your web applications with drivers developed for all the main browsers. I wanted to go one step further and see if I could integrate it into the build process so that regressions would get picked up earlier.

I though about integrating the tests to run on every build after the unit tests but I decided against this for two main reasons. 

- The unit tests are not relying on any outside dependencies so should be less prone to error whereas the Selenium tests are going to be a lot more prone to environmental problems and we don't really want the build failing because a server has gone down.

- These test generally are going to take a lot more time to run and we really dont want to slow down the build if possible.

##The tests

Selenium already provide a web driver for Node called WebDriverJs. First things first you are going to want to install this into your project with

	npm install selenium-webdriver --save-dev 