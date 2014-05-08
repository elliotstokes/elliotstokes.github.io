---
layout: post
category : coding
tags : [Testing, TDD, BDD]
image: tdd.png
---

I'm a great believer in unit testing and all automated testing really. I often see it being done incorrectly so I though I would jot down my thoughts on some of the things I see being done incorrectly.

###Mocking of external dependencies

Unit tests should be atomic. You want your unit tests to be fast so that you can run them all the time, probably every time somebody checks come code into your source control repository and connecting to external dependencies is slow and unreliable. 

If your unit tests are connecting to the file system, database, anything then **you don't have a unit test**, you have an integration test. Your unit test should be testing your code that you have written and not somebody elses.

Y

Take this simplified example:

<pre>
function AppLogic(connectionString) {
  this.dbConnection = new DbConnection(connectionString);
}

Applogic.prototype.lookupItem(itemId, callback) {

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

In this example above you should be testing that the correct messages come back when the result count is 0, 1 and < 1, not that it connects to the database ok. The testing of the database should be done within the database library.

So to test this chunk of code firstly we need to pull out the dbconnection and pass that in instead of the connection string.

<pre>
function AppLogic(dbconnection) {
  this.dbConnection = dbConnection;
}
</pre>

Then when writing the tests we should build a mocked dbConnection that returns a specific result required for that test (see example below).

It's not just external dependencies that should be mocked. You should really be mocking third party libraries and even your own code that doesn't form part of your test. For example in an MVC system you might want to test just the controller and mock the model and then write specific tests for the model.

###Node.js specific mocking example.

A library that I use quite a lot which allows me to easily mock my third party requires is [sandboxed-module](https://github.com/felixge/node-sandboxed-module). What this allows you to do is take your <code>require()</code> statements and without altering your code inject a mocked version of that library in instead. So take this example

<pre>
var myThirdPartyLib = require('thirdpartylib');

function AnotherExample() {

}

AnotherExample.prototype.doStuff(arg1, callback) {
  myThirdPartyLib.doStuffThatSomebodyElseWrote(arg1, function(result) {
    //check some stuff
    //do something else
    //Return a result
  });
}
</pre>

So in this example we don't want to test that the third part lib works we want to test our own code.

So in our test we can do this (nodeunit syntax):

<pre>
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

There we have it you have a unit test with mocked dependencies that doesnt require any external assets.
