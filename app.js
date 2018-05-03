var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var authRouter = require('./routes/auth-routes');
var profileRouter = require('./routes/profile-routes');
var indexRouter = require('./routes/index');
var passportSetup = require('./config/passport-setup.js')
var passport = require('passport');
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
var app = express();
var keys = require('./config/keys')

// view engine setup
// changed to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/assest',express.static(path.join(__dirname, 'public')));
app.use('/assest',express.static(__dirname + '/public'));

// cookie session
app.use(cookieSession({
  maxAge: 24*60*1000,
  keys:[keys.cookie.secret]
}));

mongoose.connect('mongodb://localhost/mydb',function(){
  // console.log('connected to db');
});

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// routing paths
app.use('/', indexRouter);
app.use('/auth',authRouter);
app.use('/profile',profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
