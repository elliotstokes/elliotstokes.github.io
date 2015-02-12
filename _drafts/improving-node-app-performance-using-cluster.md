---
layout: post
category : coding
image: node.png
tags : [Node, JavaScript]
---

As you may or may not be aware. A single node application is run on a single thread on a single core of your cpu. If you are running your application on a multi-core box then a great deal of your servers processing power is going unused. Help is here however using the cluster module that comes bundled with node.

Firstly create your express app in a file. For the sake of this example we will call it app.js. Get this file to return your express app object.

<pre class="prettyprint linenums">
var express = require('express');
var bodyParser = require('body-parser');

//Create new express application
var app = express();

app.use(bodyParser.json());

app.get('/get', getSomething);
app.post('/post', postSomething)

//define the error handler
app.use(handleAnError);

module.exports = app;
</pre>
The code above is creating your standard service with two endpoints <code>GET /get</code> and <code>POST /post</code>. Notice we are not asking the application to listen on any ports - just simply instantiating it and setting up the routes. We will setup the listen in the next step.

Once you have your express app generating the routes that you need for your application we need to set it to listen on a particular port so that consumers can connect. If we are going to run multiple versions how do we handle all the different ports? No need to worry the cluster module handles this for us and means that we can take advantage of the extra processing power without having to manage extra ports. The code below sets up the cluster so that we have one for each cpu on the executing server.

<pre class="prettyprint linenums">

var cluster = require('cluster');
var app = require('./app');

//Get the number of cpu's so we know how many processes to fork.
var numCPUs = require('os').cpus().length;

//If this is the master process then fork a process for each cpu
if (cluster.isMaster) {
  console.log('Starting up master process');
  // Fork workers.
  for (var i = 0; i &lt; numCPUs; i++) {
    cluster.fork();
  }

  //if for any reason a process dies log it and then create another one.
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    cluster.fork();
  });

} else {
  //We are on one of the slave clusters so we need to listen
  console.log('Starting up worker process');
  app.listen(process.env.PORT || 1337);
}

</pre>

##Things to note

There is no shared memory or state between cluster instances so if you need this you will need to use a store like <code>Redis</code> or <code>Memcached</code> or inside a database. .Windows does not currently support the round robin scheduling on slave instances

##Improvements at 0.12

At 0.10 the jobs 
