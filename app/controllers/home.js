var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    res.render('index', {
      index:'active'
    });
});

router.get('/animals', function (req, res, next) {
    res.render('animals', {
      animals:'active'
    });
});


router.get('/cages', function (req, res, next) {
    res.render('cages', {
      cages:'active'
    });
});

router.get('/strains', function (req, res, next) {
    res.render('strains');
});

router.get('/events', function (req, res, next) {
    res.render('events');
});

