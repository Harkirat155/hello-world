
var express = require('express');
var app = express();
var bodyParser = require('body-parser');



// --> 7)  Mount the Logger middleware here
app.use(function middleware(req, res, next){
/*  var method = req.method;
  var path = req.path;
  var ip = req.ip;
*/
  var string = req.method + ' ' + req.path + ' - ' + req.ip;
  console.log(string);
  next();
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

/** 1) Meet the node console. */
console.log('Hello World!');

/** 2) A first working Express Server 
app.get('/', function(req, res){
  res.send('Hello Express');
})
*/
/** 3) Serve an HTML file */
app.get('/', function(req,res) {
  var path = __dirname + '/views/index.html';
  res.sendFile(path);
});

/** 4) Serve static assets  */
//express.static(__dirname + '/public');
app.use(express.static(__dirname + '/public'));

/** 5) serve JSON on a specific route */
app.get('/json', function(req,res) {
  if(process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({"message":"HELLO JSON"});
  } else {
    res.json({"message":"Hello json"});
  }
});

/** 6) Use the .env file to configure the app */
 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', function(req, res, next) {
  req.time = new Date().toString(); // Hypothetical synchronous operation
next();
}, function(req, res) {
res.json({"time":req.time});
})

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function(req,res){
  var word = req.params.word;
  res.json({"echo": word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
/*app.get('/name', function(req,res) {
  var firstname = 
  var lastname = 
  res.json({"name": '${firstname} ${lastname}'})
});
*/

app.route('/name').get(function(req,res){
  var firstname = req.query.first;
  var lastname = req.query.last;
  var string = req.query.first+ ' '+req.query.last;
  res.json({"name": string});
}).post(function(req, res){
  var string = req.body.first+ ' '+req.body.last;
  res.json({"name": string});
});
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
//included in 10.


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
