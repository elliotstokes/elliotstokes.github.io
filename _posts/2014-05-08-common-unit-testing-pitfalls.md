---
layout: post
category : coding
tags : [Testing, TDD, BDD]
image: tdd.png
---

I'm a great believer in unit testing and all automated testing, really. I often see it being done incorrectly so I thought I would jot down my thoughts on this...

##Mocking of external dependencies

Unit tests should be self contained, require no setup and should be able to be run in any order. You want your unit tests to be fast so that you can run them all the time, probably every time somebody checks some code into your source control repository. Connecting to and using external resources is slow and unreliable and you want to reduce as much friction as you can in your build/deployment process.

If your unit tests are connecting to the file system, database, then <strong>you don't have a unit test</strong> and you are doing it wrong. You have an integration test. Your unit tests should be testing the code that you have written and not somebody else's.

<div class="alert alert-info">
I'm not saying integration tests are not a good idea, they are vital and a really good idea. I just don't think they belong with the unit tests. They should be separated out and run overnight or every hour as they will be much more prone to error.
</div>

Take this simplified example:

<pre class="prettyprint linenums">
function AppLogic(connectionString) {
  this.dbConnection = new DbConnection(connectionString);
}

Applogic.lookupItem = function(itemId, callback) {

  this.dbConnection.executeQuery(
    "SELECT * FROM table where id=:id0",
    [itemId],
    function(err, results) {
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(new Error("No results found"));
      }

      if (results.length > 1) {
        return callback(new Error('More then one result found'));
      }

      return callback(null, result[0]);
    });

}
</pre>

In this example you should be testing that the correct messages come back when the result count is 0, 1 and < 1, not that it connects to the database ok. The testing of the database should be done within the database library.

So to test this chunk of code firstly we need to pull out the dbconnection and pass that in instead of the connection string.

<pre class="prettyprint linenums">
function AppLogic(dbconnection) {
  this.dbConnection = dbConnection;
}
</pre>

Then when writing the tests we should build a mocked dbConnection that returns a specific result required for that test.

It's not just external dependencies that should be mocked. You should really be mocking third party libraries and even your own code that doesn't form part of your test. For example in an MVC system you might want to test just the controller and mock the model and then write specific tests for the model.

###Node.js specific mocking example.

A library that I use quite a lot which allows me to easily mock my third party requires is [sandboxed-module](https://github.com/felixge/node-sandboxed-module). What this allows you to do is take your <code>require()</code> statements and without altering your code inject a mocked version of that library in instead. So take this example

<pre class="prettyprint linenums">
var myThirdPartyLib = require('thirdpartylib');

function AnotherExample() {

}

AnotherExample.doStuff = function(arg1, callback) {
  myThirdPartyLib.doStuffThatSomebodyElseWrote(arg1, function(result) {
    //check some stuff
    //do something else
    //Return a result
  });
}
</pre>

So in this example we don't want to test that the third part lib works, we want to test our own code.

So in our test we can do this (nodeunit syntax):

<pre class="prettyprint linenums">
var SandboxedModule = require('sandboxed-module');
module.exports = {
  setUp: function(callback) {
    //mock the file system
    this.libMock = {};
    this.myLib = SandboxedModule.require("mylibthatIwanttotest.js", {
      "requires": {
        "thirdpartylib": this.libMock
      }
    });
    callback();
  },

  tearDown: function(callback) {
    // clean up
    callback();
  },

  "Should do something": function(test) {
    //Mock the third party lib
    this.libMock.doStuffThatSomebodyElseWrote = function(arg1, callback) {
      callback(null, 'expectedresult');
    }
    //now run my code as normal.
    this.myLib.doStuff('argument', function(err, result) {
      test.equal(result, 'expectedresult');
      test.done();
    });
  }
};
</pre>

There we have it: you have a unit test with mocked dependencies that doesn't require any external assets.

##Testing the error state

When writing unit tests I think it is always a good idea to test both the success and the failure of the function. This makes sure that any functionality fails when it should do and that it does it in a reliable and consistent way that can be trapped by the calling code. It also makes you think about possible issues before they happen and code in some extra validation at the point of development rather than hastily adding extra checks after a bug has been found. Take this over-simplified example:

<pre class="prettyprint linenums">
 myawesomelib.divStuff = function(var1, var2, callback) {
  callback(null, var1 / var2);
}
</pre>

and the test:

<pre class="prettyprint linenums">
module.exports = {
  "Should add two numbers together": function(test) {
    myawesomelib.addStuff(1,3, function(err, result) {
      test.equal(result, 4);
      test.done();
    });
  }
};
</pre>

If you were to leave the tests as that, then yes you would have 100% code coverage and yes it does divide one number by another. However, as soon as somebody divides by 0 or passes a string in then you are probably going to get unintended results, if they haven't been trapped in the calling code. It also shouldn't really be the job of the calling code to do this checking, it logically belongs with the function itself to avoid checking code strewn across your codebase. So, I would probably increase the tests to add a few more tests to make sure it errors reliably and then fix the tests by refactoring the function to include the extra checking.

<pre class="prettyprint linenums">
  "Should fail when used with non numbers": function(test) {
    myawesomelib.addStuff(1,3, function(err, result) {
      test.notEqual(err, null);
      test.equal(err.message, "Parameters must be numbers");
      test.done();
    });
  },
  "Should fail when attempting to divide by 0": function(test) {
    myawesomelib.addStuff(4,0, function(err, result) {
      test.notEqual(err, null);
      test.equal(err.message, "Cannot divide by 0");
      test.done();
    });
  }
</pre>

I hope somebody benefits from my <del>rant</del> post. Go forth and unit test.
