---
layout: post
category : coding
image: javascript.png
tags : [Mobile, JavaScript]
---

Albeit a bit clunky compared to a true object orientated languages it is still possible to implement some of object-orientated patterns within JavaScript and node.js. Recently I was refactoring one of my node applications and decided to create a base class to hold all of the common functionality shared with a few classes I had. I wanted each class to be held in a seperate file so the files would be easier to maintain. I have documented it here in case anyone was looking for a pattern like this. It's also worth saying that this will work in client side JavaScript as well, although it might be worth using [requirejs](http://requirejs.org/) and modifying the way the modules are required first.

The classes in question all made some sort of http request so I firstly created a base class that contained functions for creating a connection using all of the common http verbs.

<pre class="prettyprint linenums">
'use strict';

function Base() {

  /**
   * Posts to specific url with specific data
   **/
  this.post = function(url, body, callback) {
  	//validation of url and inputs
    //http Post to the url
    //validation checks
    //callback(error, result);
  };

  this.get = function(url, callback) {
    //http get to the url
    //validation checks
    //callback(error, result);
  };

  this.put = function(url, body, callback) {
    //http put to the url
    //validation checks
    //callback(error, result);
  };

  this.delete = function(url, callback) {
    //http delete to the url
    //validation checks
    //callback(error, result);
  };

}

module.exports = Base;
</pre>

This encapsulated all of the general functionality required to make those requests. The benefits you have of this method is you can write your validation routines and response checking code within this class and then each class that inherits from this will automatically take advantage of that code. For example, you could check the http status code for the post and if it was not 200 or 201 then you could automatically return an error, rather than have to do this n times in your super class. 

Next I took my classes and inherited from this class. Where a connection was needed I then called the inherited methods instead of doing it in the super class. This resulted in cleaner code in the super class. 

<pre class="prettyprint linenums">
'use strict';
/* jshint node:true */

var Base = require("./common/base");

function CatApi(apiKey) {
	apiKey = apiKey || "";
	baseUrl = 'http://catsareawesome.com/rest/';

	/**
	 * Adds a cat
	 */
	this.addCat = function(name, age, isLong,  callback) {
		var url = baseUrl + 'cat';
		
		var details = {
			'name': name,
			'age' : age,
			'isLong': isLong
		};

		this.post(url, details, callback);
	};

	/**
	 * Gets all cats
	 */
	this.getCats = function() {
		var url = baseUrl + 'cats';
		this.get(url, callback);
	};

	/**
	 * Gets all long cats
	 */
	this.getLongCats = function() {
		var url = baseUrl + 'cats?isLong=true';
		this.get(url, callback);
	}; 
}

//inherit from the base here.
CatApi.prototype = new Base();

module.exports = CatApi;
</pre>

The code should also be less error prone and easier to fix in the future. I think it cleaned up the code and made far more maintainable. It's not really rocket science but maybe it might help somebody out. 

