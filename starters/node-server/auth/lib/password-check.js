
var User = require('../models/user');

async function passwordCheck (username, password) {

  try {
    var user = await User.findOne({ username: username })
  }
  catch (err) {
    return {
      success: false,
      message: "User not found or database error."
    };
  }

  if (user == null) return {
    success: false,
    message: "User not found."
  }
  else {
    if (!user.checkPassword(password)) {
      return {
        success: false,
        message: "Invalid password."
      };
    }

    return {
      success: true,
      user: user
    };
  }
}

module.exports = passwordCheck;
