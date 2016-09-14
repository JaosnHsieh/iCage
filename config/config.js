var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'icage'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://root:0000@localhost:3306/iCage'
  },

  test: {
    root: rootPath,
    app: {
      name: 'icage'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/icage-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'icage'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/icage-production'
  }
};

module.exports = config[env];
