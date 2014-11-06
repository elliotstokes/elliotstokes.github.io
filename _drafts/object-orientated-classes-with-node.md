---
layout: post
category : coding
image: javascript.png
tags : [Mobile, JavaScript]
---

Albeit a bit clunky compared to a true object orientated languages it is still possible to implement some of object-orientated patterns within JavaScript and node. Recently I was refactoring one of my node applications and decided to create a base class to hold all of the common functionality shared with a few classes I had. I wanted each class to be held in a seperate file so the files would be easier to maintain.

Firstly I created a base class that contained all of the common http verbs. 

<pre class="prettyprint linenums">
'use strict';

function Base() {

  /**
   * Posts to specific url with specific data
   **/
  this.post = function(url, body, callback) {
    //http Post to the url
    //callback(error, result);
  };

  this.get = function(url, callback) {
    //http get to the url
    //callback(error, result);
  };

  this.put = function(url, body, callback) {
    //http put to the url
    //callback(error, result);
  };

  this.delete = function(url, callback) {
    //http delete to the url
    //callback(error, result);
  };

}

module.exports = Base;

</pre>

This encapsulated all of the general functionality required to make those requests. The benefits you have of this method is you can write your validation routines and response checking code within this class and then each class that inherits from this will automatically take advantage of that code. For example you could check the http status code for the post and if it was not 200 or 201 then you could automatically return an error, rather than have to do this n times in your super class. 

Next I took my modules  and inherited from this class and then called these methods instead of using <code>http</code> module direct.

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
		var url = baseUrl + 'cat'
		
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

	};

	/**
	 * Gets all long cats
	 */
	this.getLongCats = function() {

	}; 
}

CatApi.prototype = new Base();

module.exports = CatApi;

</pre>

