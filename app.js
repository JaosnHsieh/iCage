

var express = require('express'),
  config = require('./config/config'),
  db = require('./app/models'),
  epilogue = require('epilogue');


var app = express();

require('./config/express')(app, config);
// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: db.sequelize
});

// Create REST resource
var userResource = epilogue.resource({
  model: Animal,
  endpoints: ['/api/animals', '/api/animals/:id']
});


db.sequelize
  .sync()
  .then(function () {
    app.listen(config.port, function () {
      console.log('Express server listening on port ' + config.port);
    });
  }).catch(function (e) {
    throw new Error(e);
  });

