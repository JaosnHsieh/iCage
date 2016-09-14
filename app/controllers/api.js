var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/animals',(req,res)=>{
    db.Animal.findAll()
      .then((data)=>{
        res.send(data);
      })
      .catch((err)=>{
        res.send(err);
      });
});

router.post('/animals',(req,res)=>{
    db.Animal.findAll()
      .then((data)=>{
        res.send(data);
      })
      .catch((err)=>{
        res.send(err);
      });
});