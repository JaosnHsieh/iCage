var express = require('express');
var glob = require('glob');
var session = require('express-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var path = require('path');


module.exports = function (app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  // app.engine('handlebars', exphbs({
  //   layoutsDir: config.root + '/app/views/layouts/',
  //   defaultLayout: 'main',
  //   partialsDir: [config.root + '/app/views/partials/']
  // }));
  // app.set('views', config.root + '/app/views');
  // app.set('view engine', 'handlebars');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(methodOverride());

  // //// login logout signup start ===============================

  //   app.use(session({

  //       secret: '123456',

  //       name: 'cookie-name',

  //       // store: sessionStore, // connect-mongo session store

  //       proxy: true,

  //       resave: true,

  //       saveUninitialized: true

  //   }));

  // app.get('/login',function(req,res){
  //   res.sendFile('login.html', { root: config.root + '/public' });
  // });

  // app.get('/signup',function(req,res){
  //   res.sendFile('signup.html', { root: config.root + '/public' });
  // });


  // app.post('/login',function(req,res){
  //    if(req.body.username=="admin"&&req.body.pwd==""){

  //      req.session.login = true;
  //      req.session.admin = true;
  //      res.redirect('/');

  //    }
  // });

  // app.get('/logout',function(req,res){

  //     req.session.login = false;
  //      req.session.admin = false;
  //      res.redirect('/');
  // });

  // app.use('*',function isLoggedIn(req, res, next) {

  //     // console.log('req.path',req.baseUrl,'req.method',req.method);
  //     if(req.baseUrl =='/api/signup'&&req.method=='POST'||req.baseUrl =='/api/login'&&req.method=='POST'){
  //       return next();
  //     }

  //     // if user is authenticated in the session, carry on
  //     if (req.session.login)
  //         return next();

  //     // if they aren't redirect them to the home page
  //     res.redirect('/login');
  // });

  // //// login logout signup end ===============================

  app.use('/', express.static(config.root + '/public'));


  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  

  app.get('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', {
      root: config.root + '/public'
    });
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};