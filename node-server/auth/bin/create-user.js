
var db = require('../../site/db');
var User = require('../models/user');

async function createUser(args) {
  try {
    var user = new User({ username: args.username, isAdmin: args.admin });
    user.setPassword(args.password);
    await user.save();
    console.log("User created.");
  }
  catch(err) {
    console.log(err);
  }
}

module.exports = createUser;
