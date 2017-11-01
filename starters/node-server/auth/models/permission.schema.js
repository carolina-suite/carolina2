
var mongoose = require('mongoose');

var permissionSchema = new mongoose.Schema({
  name: String,
  verboseName: String,
  description: String
});
module.exports = permissionSchema;
