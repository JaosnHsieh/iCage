var express = require('express'),
  router = express.Router(),
  db = require('../models'),
  moment = require('moment');

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

  console.log(moment().format('YYYY-MM-DD HH:mm:ss.SSS'));
    
    var data = req.body;
    var animal = db.Animal.build();

      c(req.body);

        animal.customerId = data.customerId;
        animal.animalNo = data.animalNo;
        animal.status = data.status;
        animal.strainId = data.strainId;
        animal.strainNam = data.strainNam;
        animal.strainCategory = data.strainCategory;
        animal.cageId = data.cageId;
        animal.cageNo = data.cageNo; 
        animal.sex = data.sex;
        animal.weight = data.weight;    
        animal.memo = data.memo;
        animal.resume = data.resume;
        animal.iacuc = data.iacuc;
        animal.birth = data.birth;
        animal.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        animal.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        
        animal.save()
        .then(function(data){
          c('ya');
          res.status(200).send('animal inserted successfully');
        })
        .catch(function(err){
          console.log('err',err);
        });

});