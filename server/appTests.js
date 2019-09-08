// appTests.js
/*
Solo para comprobar los test Ajax !!!!!
*/
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
//var cors = require('cors');

var fs = require('fs');
var util = require('util');

var app = express();

//------------------------------------------------------------------- Directories
app.use("/", express.static("./apps/App0/html/test"));
app.use("/pbas", express.static("./apps/App0/html/pbas"));
app.use("/k1", express.static("./kernels/kernel1/alfa"));
app.use("/lib", express.static("./libs"));
app.use("/fonts", express.static("./fonts"));


//------------------------------------------------------------------- C O R S
app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://marigold.es');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

//------------------------------------------------------------------- Connection to DB
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true }, function(err, res) {
	if(err) throw err;
	console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(methodOverride());

// Import Models, Controllers and Routes

var models = require('./model');
var control = require('./controller');
var router = require('./routes');
router(app); //register the route

//------------------------------------------------------------------- Start server
app.listen(1948, function() {
	console.log("App Tests en http://localhost:1948");
});

//------------------------------------------------------------------- Debug log
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

