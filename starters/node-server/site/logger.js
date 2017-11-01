
var path = require('path');

var winston = require('winston');
require('winston-mongodb');

var config = require('./config');
var db = require('./db');

var loggers = {};
for (var i = 0; i < config.site.includedApps.length; ++i) {

  var appName = config.site.includedApps[i];
  var loggerFileName = `${appName}${new Date().toISOString().slice(0,10)}.log`;

  loggers[appName] = new winston.Logger({
    transports: [
      new winston.transports.File({
        filename: path.join(__dirname, '..', '_logs', loggerFileName),
        level: config.site.logging.fileLogLevel
      }),
      new winston.transports.Console({
        colorize: true,
        level: config.site.logging.consoleLogLevel
      }),
      new winston.transports.MongoDB({
        collection: 'logs',
        db: `mongodb://${config.site.db.host}:${config.site.db.port}/${config.site.db.name}`,
        decolorize: true,
        label: appName,
        level: config.site.logging.dbLogLevel,
        silent: false
      })
    ]
  });
}

module.exports = loggers;
