
var mongoose = require('mongoose');

var socialLinkSchema = new mongoose.Schema({
  facebook: String,
  github: String,
  twitter: String
});

module.exports = socialLinkSchema;
