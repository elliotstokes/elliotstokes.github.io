---
layout: post
category : coding
tags : [Web, JavaScript, Testing]
---

Recently I have been getting into TDD/BDD. Specifically writing unit tests with [Jasmine](http://pivotal.github.io/jasmine/). It got to the point where I had built up selection of tests and the next step was to integrate them with the build process.

I was already using [Grunt](http://gruntjs.com/) within the project so it was an obvious place to integrate the tests. For anbody who hasn't heard of or used Grunt. I really can't convey to you enough how useful a tool it is. It's just a task runner written in JavaScript but has some really great community support. If you are trying to automate a specific task for your project, chances are somebody has already written a Grunt plugin to do what you want.

So where to start.  I have a TestRunner.html page that needs to be invoked automatically and the result of the tests returned to the calling process. The most pressing issue is that we need a way to run the tests from somewhere else other than a web browser. Enter PhantomJs.

PhantomJs although still technically a browser is headless so has no Ui and can be instantiated from the command line e.g. <code>PhantomJs 'file.js'</code>. That does almost all we need but its still not enough to invoke the tests and return the results to the command line. You need to grab two scripts from the [Phantom Jasmine](https://github.com/jcarver989/phantom-jasmine) project written by JCarver989. The first script is used to run the tests in PhantomJs and handle the results and the other is a console logger that goes into your TestRunner.html so that PhantomJs can easily pick up the results. You can then call your Jasmine Test Runner with PhantomJs and output the results to the console with the command <code>PhantomJs run_jasmine_test.coffee /path/to/testrunner.html</code>.

So just to recap we now have our unit tests running through phantomJs and the results passed back. The last step is automating this. To do this you can use a Grunt plugin called [grunt-shell](https://github.com/sindresorhus/grunt-shell) which allows you to interact with the cli from within grunt. Taking the example from the site:

<pre>

shell: { 				// Task
  runmyawesometests: {	// Target
    options: {  		// Options
      stdout: true
    },
    command: 'runtests'
  }
}

grunt.loadNpmTasks('grunt-shell');
grunt.registerTask('default', ['shell:runmyawesometests']);

</pre>

Its then just a matter of putting in the correct paths running <code>grunt</code> and your tests will get run along with all your other automated tasks.

