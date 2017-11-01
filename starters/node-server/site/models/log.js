
var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
  timestamp: Date,
  level: String,
  message: String,
  meta: {},
  label: String
});

logSchema.statics.getAdminFields = function() {
  return ['_id', 'timestamp', 'label', 'level', 'message'];
}

var Log = mongoose.model('Log', logSchema);
module.exports = Log;
