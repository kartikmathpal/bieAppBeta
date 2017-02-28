/*
//Creates an Express application. The express() function is a top-level function exported by the express module.
//var express = require('express');
//var app = express();//The app object conventionally denotes the Express application.
*/

var express = require('express');
var path = require('path'); //path module provides utilities for working with file and directory paths
var favicon = require('serve-favicon');
var logger = require('morgan'); //Morgan is basically a logger, on any requests being made,it generates logs automatically.
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var hbs = require('hbs');//hbs is a express.js wrapper for the handlebars.js javascript template engine.It is a template engine to make writing html code easier
                         //But handlebars.js is meant for client-side copilation(the browser compiles the templates) so you need a wrapper like hbs.
                         //A wrapper makes it possible to use for example a client-side library in express.js

//#################<MY Routes>###########################
var viewRoutes = require('./routes/view_routes');
// var users = require('./routes/users');

// var menu = require('./routes/menu');
var serviceRoutes = require('./routes/service_routes')
//######################################################

var app = express();


hbs.registerHelper('raw-helper', function(options) {
    return options.fn();
});

// view engine setup
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', path.join(__dirname, 'views'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewRoutes);
app.use('/service',serviceRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
