// app.js

var session = require('express-session');
var express = require('express');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var path = require('path');
var logger = require('morgan');
var userInViews = require('./lib/middleware/userInViews');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const app = express();

dotenv.load();
//session-related stuff
var sess = {
 secret: 'secret',
 cookie: {},
 resave: false,
 saveUninitialized: true
};

var Auth0Strategy = require('passport-auth0'),
    passport = require('passport');

var strategy = new Auth0Strategy({
  domain: 'hanhnvbkhnsso1.auth0.com',
  clientID: 'OokuSB66NjtD7Nn4oiPi98sY8Dm1Dply',
  clientSecret: '70kZQoC5a-tTylz4Bs4LbSIAOP531tMfTd9pWsD9uqY4ohCX9Ek-vvFsP-_Wn5Tf', // Replace this with the client secret for your app
  callbackURL: 'http://localhost:3000/callback',
  state: true
 },
 function(accessToken, refreshToken, extraParams, profile, done) {
   // accessToken is the token to call Auth0 API (not needed in the most cases)
   // extraParams.id_token has the JSON Web Token
   // profile has all the information from the user
   return done(null, profile);
 }
);

if (app.get('env') === 'production') {
 sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));

passport.use(strategy);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(passport.initialize());
app.use(passport.session());

//Truyen file tinh nhu css trong js
app.use(express.static(path.join(__dirname, 'public')));


// Handle auth failure error messages
app.use(function (req, res, next) {
  if (req && req.query && req.query.error) {
    req.flash('error', req.query.error);
  }
  if (req && req.query && req.query.error_description) {
    req.flash('error_description', req.query.error_description);
  }
  next();
});

app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

