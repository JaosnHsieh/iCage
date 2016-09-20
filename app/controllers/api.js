'use strict'
let express = require('express'),
  router = express.Router(),
  db = require('../models'),
  moment = require('moment');

module.exports = function (app) {
  app.use('/api', router);
};


//// Aniaml table start

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
    
    let data = req.body;
    let animal = db.Animal.build();

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

router.put('/animals', (req, res, next) => {
    
        let animal = req.body;
        animal.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        // search for attributes
        db.Animal.findOne({ where: {idNo: animal.idNo} }).then(function(data) {
        // project will be the first entry of the Projects table with the title 'aProject' || null
        data.updateAttributes(animal).then(function(todo) {
                        res.json(todo);
                        console.log('update successfully');
                      });

          });
      
    
});

router.delete('/animals', (req, res, next) => {

        
        let animal = req.body;
        
        db.Animal.destroy({ where: {idNo: animal.idNo} }).then(function(data) {
          
              res.send('delete succesffully');
      
          });
      
    
});

//// animal table end


//// cage table start

router.get('/cages',(req,res)=>{
    db.Cage.findAll()
      .then((data)=>{
        res.send(data);
      })
      .catch((err)=>{
        res.send(err);
      });
});

router.post('/cages',(req,res)=>{

    
    let data = req.body;
    let cage = db.Cage.build();

        cage.name = data.name;
        cage.status = data.status;
        cage.ip = data.ip;
        cage.memo = data.memo;
        cage.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        cage.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        
        cage.save()
        .then(function(data){
          res.status(200).send('cage inserted successfully');
        })
        .catch(function(err){
          console.log('err',err);
        });

});

router.put('/cages',(req, res, next) => {
    
        let cage = req.body;
        
        console.log(cage);
        // search for attributes
        db.Cage.findOne({ where: {idNo: cage.idNo} }).then(function(data) {
        // project will be the first entry of the Projects table with the title 'aProject' || null
        data.updateAttributes(cage).then(function(cage) {
                        res.json(cage);
                      });

          });
      
    
});

router.delete('/cages', (req, res, next) => {

        
        let cage = req.body;
        
        db.Cage.destroy({ where: {idNo: cage.idNo} }).then(function(data) {
          
              res.send('delete succesffully');
      
          });
      
    
});

//// cage table end



//// strain table start

router.get('/strains',(req,res)=>{
    db.Strain.findAll()
      .then((data)=>{
        res.send(data);
      })
      .catch((err)=>{
        res.send(err);
      });
});

router.post('/strains',(req,res)=>{

    
    let data = req.body;
    let strain = db.Strain.build();

        strain.name = data.name;
        strain.memo = data.memo;
        strain.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        strain.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        
        strain.save()
        .then(function(data){
          res.status(200).send('strain inserted successfully');
        })
        .catch(function(err){
          console.log('err',err);
        });

});

router.put('/strains',(req, res, next) => {
    
        let strain = req.body;
        
        console.log(strain);
        // search for attributes
        db.Strain.findOne({ where: {idNo: strain.idNo} }).then(function(data) {
        // project will be the first entry of the Projects table with the title 'aProject' || null
        data.updateAttributes(strain).then(function(strain) {
                        res.json(strain);
                      });

          });
      
    
});

router.delete('/strains', (req, res, next) => {

        
        let strain = req.body;
        
        db.Strain.destroy({ where: {idNo: strain.idNo} }).then(function(data) {
          
              res.send('delete succesffully');
      
          });
      
    
});

//// strain table end




//// event table start

router.get('/events',(req,res)=>{
    db.Event.findAll()
      .then((data)=>{
        res.send(data);
      })
      .catch((err)=>{
        res.send(err);
      });
});

router.post('/events',(req,res)=>{

    
    let data = req.body;
    let event = db.Event.build();

        event.name = data.name;
        event.inOut = data.inOut;
        event.memo = data.memo;
        event.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        event.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        
        event.save()
        .then(function(data){
          res.status(200).send('event inserted successfully');
        })
        .catch(function(err){
          console.log('err',err);
        });

});

router.put('/events',(req, res, next) => {
    
        let event = req.body;
        
        console.log(event);
        // search for attributes
        db.Event.findOne({ where: {idNo: event.idNo} }).then(function(data) {
        // project will be the first entry of the Projects table with the title 'aProject' || null
        data.updateAttributes(event).then(function(event) {
                        res.json(event);
                      });

          });
      
    
});

router.delete('/events', (req, res, next) => {

        
        let event = req.body;
        
        db.Event.destroy({ where: {idNo: event.idNo} }).then(function(data) {
          
              res.send('delete succesffully');
      
          });
      
    
});

//// event table end

router.get('/users',function(req,res){
  res.json({data:{items:{name:'jason',email:'haha'},Count:5}});
});