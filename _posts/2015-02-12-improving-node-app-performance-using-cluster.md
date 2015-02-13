---
layout: post
category : coding
image: node.png
tags : [Node, JavaScript]
---
As you are probably aware a node application is run on a single thread on a single core of your cpu. If you are running your application on a multi-core box then a great deal of your servers processing power is going unused. Help is available however using the cluster module that comes bundled with node. The cluster module allows you to take advantage of the extra cores available on modern processors which will hopefully improve the performance of your application. I have detailed some of the steps I have used previously in order to make use cluster.

Firstly create your express app object in a file or if you are retrofitting this to an existing express/http application remove the listen and return the app object in a <code>module.exports</code>. For the sake of the example I will call the file app.js. A short example is shown below.

<pre class="prettyprint linenums">
var express = require('express');

//Create new express application
var app = express();

app.get('/get', getSomething);
app.post('/post', postSomething)

//export the object
module.exports = app;
</pre>

The code above is creating your standard service with two endpoints <code>GET /get</code> and <code>POST /post</code>. Notice we are not asking the application to listen on any ports - just simply instantiating it and setting up the routes. We will setup the listen in the next step. Creating the app object separately to the listener also has the added benefit that when it comes to performing integration tests you can consume the object directly with [supertest](https://github.com/visionmedia/supertest) or similar.

Once you have your express app generating the routes that you need for your application we need to set it to listen on a particular port so that consumers can connect. So, If there are going to be multiple instances of our application running how do we manage the ports? No need to worry, the cluster module handles this for us and means that we can take advantage of the extra processing power, all the while allowing the system to run on a single port as before. The code below sets up the cluster so that we have one application instance for each cpu on the executing server.

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

The code above also handles the case where one of the slave processes stops for any reason. In this case it will instantiate a new process to replace it.

Once that is done run up your application in the console and you should see something like this.

<pre>
$ node index.js
$ Starting up master process
$ Starting up worker process
$ Starting up worker process
$ Starting up worker process
$ Starting up worker process
</pre>

That is then that. You should now be able to take advantage of much more of the servers resources.

##Things to note

- There is no shared memory or state between cluster instances so if you need this you will need to use a store like <code>Redis</code> or <code>Memcached</code> or inside a database.  
- Windows does not currently support the round robin scheduling on slave instances.
- Memory usage will be higher using cluster so bear it in mind if your application consumes a lot of memory.

##Improvements at 0.12

At 0.10 the scheduling of jobs to the slave processes was done by the operating system, which in some cases caused uneven load on the slave processes. At 0.12 bscheduling is now done using round robin by default.
