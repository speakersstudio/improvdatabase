var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var indexRoute  = require('./routes/index'),
    api         = require('./routes/api'),
    contact     = require('./routes/contact');

var config = require('./config')();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon/favicon.ico')));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// TODO: include front-end node modules?

/*
// set up API stuff
app.all( '/api/*', function( req, res, next ) {
    res.header( 'Access-Control-Allow-Origin', '*' );
    res.header( 'Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, OPTIONS' );
    res.header( 'Access-Control-Allow-Headers', 'origin, x-requested-with, x-file-name, content-type, cache-control' );
    // Process preflight if it is OPTIONS request
    if( 'OPTIONS' === req.method ) {
        res.send( 203, 'No Content' );
    } else {
        next();
    }
});
*/

// ROUTES

// AUTH
var auth = require('./auth');
app.post('/login', auth.login);
app.post('/logout', auth.logout);
app.post('/refreshToken', auth.checkToken, auth.refresh);
app.all('/api/*', auth.checkToken);

// CONTACT
app.post('/contact', contact.send);

//CRUD
app.post('/api/:op', api.create);
app.get('/api/:op', api.getAll);
app.get('/api/:op/expand', api.getAllExpanded);
app.get('/api/:op/:id', api.get);
app.get('/api/:op/:id/expand', api.getExpanded);
app.put('/api/:op', api.update);
app.put('/api/:op/:id', api.update);
app.delete('/api/:op/:id', api.delete);
app.all('/api/:op/:id/:method', api.method);
app.all('/api/:op/:id/:method/:toId', api.method);

app.get('/*', indexRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
