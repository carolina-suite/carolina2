
var crypto = require('crypto');

var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  salt: String,
  email: String,
  name: String,
  isAdmin: { type:Boolean, default: false },
  imageUrl: { type: String }
});

userSchema.statics.getAdminFields = function() {
  return ['_id', 'username', 'email', 'isAdmin'];
}

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(32).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
userSchema.methods.checkPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.password == hash;
};
userSchema.methods.generateJwtToken = function (secret) {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  return jwt.sign({
    username: this.username,
    expirationDate: expirationDate
  }, secret);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
