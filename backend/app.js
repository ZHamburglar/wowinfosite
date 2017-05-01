var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');



var index = require('./routes/index');
var users = require('./routes/users');
var wowcharacter = require('./routes/wowcharacter');
var wowguild = require('./routes/wowguild');
var wowitem = require('./routes/wowitem');
var wowmount = require('./routes/wowmount');
var wowpets = require('./routes/wowpets');
var wowpvpbg = require('./routes/wowpvpbg');
var wowserverstatus = require('./routes/wowserverstatus');
var wowquests = require('./routes/wowquests');
var wowachievements = require('./routes/wowachievements');
var wowauction = require('./routes/wowauction');
var wowrecipes = require('./routes/wowrecipes');
var wowzones = require('./routes/wowzones');
var wowdata = require('./routes/wowdata');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/wowcharacter', wowcharacter);
app.use('/wowguild', wowguild);
app.use('/wowitem', wowitem);
app.use('/wowmount', wowmount);
app.use('/wowpets', wowpets);
app.use('/wowpvpbg', wowpvpbg);
app.use('/wowserverstatus', wowserverstatus);
app.use('/wowquests', wowquests);
app.use('/wowachievements', wowachievements);
app.use('/wowauction', wowauction);
app.use('/wowrecipes', wowrecipes);
app.use('/wowzones', wowzones);
app.use('/wowdata', wowdata);

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
