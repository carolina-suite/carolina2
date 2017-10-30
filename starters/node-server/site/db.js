
var mongoose = require('mongoose');

var config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.site.db.host}:${config.site.db.port}/${config.site.db.name}`, {
  useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Error'));
module.exports = db;
