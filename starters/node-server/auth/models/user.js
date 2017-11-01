
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
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
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
userSchema.methods.addGroups = async function(groupNames) {
  var Group = require('./group');
  for (var i = 0; i < groupNames.length; ++i) {
    console.log(groupNames[i]);
    var group = await Group.findOne({ name: groupNames[i] });
    this.groups.push(group._id);
  }
}
userSchema.methods.hasPermission = function(perm) {

  for (var i = 0; i < this.groups.length; ++i) {
    if (this.groups[i].hasPermission(perm)) return true;
  }

  return false;
}

var User = mongoose.model('User', userSchema);

module.exports = User;
