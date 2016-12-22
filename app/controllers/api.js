'use strict'
const express = require('express'),
  router = express.Router(),
  db = require('../models'),
  moment = require('moment'),
  _ = require('lodash');

module.exports = function (app) {
  app.use('/api', router);
};

//// login and signup start


router.post('/login', function (req, res) {
  db.User.find({
      where: {
        username: req.body.username,
        password: req.body.pwd
      }
    })
    .then((user) => {
      if (user == null) {
        res.send('帳號或密碼錯誤!!')
      } else {
        req.session.user = user;
        req.session.login = true;
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.send(err);
    });

});

router.post('/signup', function (req, res) {

  db.User.find({
      where: {
        username: req.body.username
      }
    })
    .then((user) => {
      if (user == null) {

        let User = db.User.build();
        User.username = req.body.username;
        User.password = req.body.pwd;
        User.name = req.body.name;
        User.memo = req.body.memo;
        User.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        User.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

        User.save()
          .then(function (data) {
            req.session.login = true;
            res.redirect('/');
          })
          .catch(function (err) {
            console.log('err', err);
          });
      } else {
        res.sendStatus(403);
      }
    })
    .catch((err) => {
      res.send(err);
    });

});


//// login and signup end





//// Aniaml table start

router.get('/animals', (req, res) => {

  let queryCrit = req.query.cageNo ? {
    cageNo: req.query.cageNo
  } : {};
  let options = {
    where: queryCrit
  };


  db.Animal.findAll(options)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });





});

router.post('/animals', (req, res) => {



  let data = req.body;
  let animal = db.Animal.build();

  animal.customerId = data.customerId;
  animal.animalNo = data.animalNo;
  animal.status = data.status;
  animal.strainId = data.strainId;
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
    .then(function (data) {
      res.status(200).send(data);
    })
    .catch(function (err) {
      console.log('err', err);
      res.status(400).send('error');
    });

});

router.put('/animals', (req, res, next) => {

  let animal = req.body;
  animal.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  // search for attributes
  db.Animal.findOne({
    where: {
      idNo: animal.idNo
    }
  }).then(function (data) {
    // project will be the first entry of the Projects table with the title 'aProject' || null
    data.updateAttributes(animal).then(function (animal) {
      res.status(200).send('animal updated successfully');
    });

  });


});

router.delete('/animals', (req, res, next) => {


  let animal = req.body;

  db.Animal.destroy({
    where: {
      idNo: animal.idNo
    }
  }).then(function (data) {

    res.send('delete succesffully');

  });


});

//// animal table end


//// animallog table start

router.post('/animallogs', (req, res) => {



let data = req.body;
let animallog = db.AnimalLog.build();

animallog.cageNo = data.cageNo;
animallog.animalId = data.animalId;
animallog.eventId = data.eventId;
animallog.eventName = data.eventName;
animallog.inOut = data.inOut;
animallog.memo = data.memo;

animallog.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
animallog.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

animallog.save()
  .then(function (data) {
    res.status(200).send(data);
  })
  .catch(function (err) {
    console.log('err', err);
    res.status(400).send('error');
  });

});

//// animallog table end


//// cage table start

router.get('/cages', (req, res) => {
  db.Cage.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/cages', (req, res) => {


  let data = req.body;
  let cage = db.Cage.build();

  cage.no = data.no;
  cage.customerId = data.customerId;
  cage.qrCodeId = data.qrCodeId;
  cage.position = data.position;
  cage.status = data.status;
  cage.ip = data.ip;
  cage.memo = data.memo;
  cage.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  cage.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

  cage.save()
    .then(function (data) {
      res.status(200).send('cage inserted successfully');
    })
    .catch(function (err) {
      console.log('err', err);
    });

});

router.put('/cages', (req, res, next) => {

  let cage = req.body;

  console.log(cage);
  // search for attributes
  db.Cage.findOne({
    where: {
      idNo: cage.idNo
    }
  }).then(function (data) {
    // project will be the first entry of the Projects table with the title 'aProject' || null
    data.updateAttributes(cage).then(function (cage) {
      res.json(cage);
    });

  });


});

router.delete('/cages', (req, res, next) => {


  let cage = req.body;

  db.Cage.destroy({
    where: {
      idNo: cage.idNo
    }
  }).then(function (data) {

    res.send('delete succesffully');

  });


});

//// cage table end



//// strain table start

router.get('/strains', (req, res) => {
  db.Strain.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/strains', (req, res) => {


  let data = req.body;
  let strain = db.Strain.build();

  strain.name = data.name;
  strain.memo = data.memo;
  strain.category = data.category;
  strain.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  strain.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

  strain.save()
    .then(function (data) {
      res.status(200).send('strain inserted successfully');
    })
    .catch(function (err) {
      console.log('err', err);
    });

});

router.put('/strains', (req, res, next) => {

  let strain = req.body;

  console.log(strain);
  // search for attributes
  db.Strain.findOne({
    where: {
      idNo: strain.idNo
    }
  }).then(function (data) {
    // project will be the first entry of the Projects table with the title 'aProject' || null
    data.updateAttributes(strain).then(function (strain) {
      res.json(strain);
    });

  });


});

router.delete('/strains', (req, res, next) => {


  let strain = req.body;

  db.Strain.destroy({
    where: {
      idNo: strain.idNo
    }
  }).then(function (data) {

    res.send('delete succesffully');

  });


});

//// strain table end




//// event table start

router.get('/events', (req, res) => {


  if (Object.keys(req.query) != 0) { // 有query資料
    db.Event.findAll({
        where: req.query
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {  //沒query資料
    db.Event.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }


});

router.post('/events', (req, res) => {


  let data = req.body;
  let event = db.Event.build();

  event.name = data.name;
  event.inOut = data.inOut;
  event.memo = data.memo;
  event.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  event.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

  event.save()
    .then(function (data) {
      res.status(200).send('event inserted successfully');
    })
    .catch(function (err) {
      console.log('err', err);
    });

});

router.put('/events', (req, res, next) => {

  let event = req.body;

  console.log(event);
  // search for attributes
  db.Event.findOne({
    where: {
      idNo: event.idNo
    }
  }).then(function (data) {
    // project will be the first entry of the Projects table with the title 'aProject' || null
    data.updateAttributes(event).then(function (event) {
      res.json(event);
    });

  });


});

router.delete('/events', (req, res, next) => {


  let event = req.body;

  db.Event.destroy({
    where: {
      idNo: event.idNo
    }
  }).then(function (data) {

    res.send('delete succesffully');

  });


});

//// event table end

router.get('/users', function (req, res) {
  res.json({
    data: {
      items: {
        name: 'jason',
        email: 'haha'
      },
      Count: 5
    }
  });
});


// 感應器 start

let tempData = {};
let vibrateData = {
  v: [],
  t: []
};

router.get('/sensor',function(req,res){
      res.json(tempData[req.query.ip]);
});

router.post('/sensor/food',function(req,res){
    
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.replace(/^.*:/, '');
    
    if(typeof tempData[ip] == 'undefined'){
          tempData[ip] = {};
    }

    else{
          tempData[ip]['food']= req.body;
    }

});

router.post('/sensor/water',function(req,res){
        
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.replace(/^.*:/, '');
    
    if(typeof tempData[ip] == 'undefined'){
          tempData[ip] = {};
    }

    else{
          tempData[ip]['water']= req.body;
    }

});

router.post('/sensor/vibrate', function (req, res) {


    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.replace(/^.*:/, '');


    if(typeof tempData[ip] == 'undefined'){
          tempData[ip] = {};
    }

    else{
          tempData[ip]['vibrate']= req.body;
    }

  // 用lodash把資料加起來
  _.mergeWith(vibrateData, req.body, customizer);

  if (vibrateData.t.length >= 100) {

    let vibrate = db.Vibrate.build();

    vibrate.data = JSON.stringify(vibrateData);

    vibrate.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    vibrate.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

    vibrate.save()
      .then(function (data) {
        res.send('');
      })
      .catch(function (err) {
        console.log('----------err-----------', err);
      });

    vibrateData = {
      v: [],
      t: []
    };

  } else {

    res.send('');

  }

  function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  }

});

//感應器 end

router.all('/*',function(req,res){
  res.status(500).send('error');
  
});

