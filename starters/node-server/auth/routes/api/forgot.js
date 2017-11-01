
var config = require('../../../site/config');
var logger = require('../../../site/logger');

var User = require('../../models/user');

async function login(request, reply) {

  if (!request.body.hasOwnProperty('username')) {
    logger.auth.log('verbose', "Request rejected. No username provided.");
    reply.status(401).send({
      success: false,
      message: "Username required."
    });
  }

  try {
    var user = await User.findOne({ username: request.body.username });
    if (user.email.length > 0) {

      var emailManager = require('../../../_lib/email');
      var newPassword = require('rand-token').generate(16);
      var creds = `Username: ${request.body.username}\n`;

      creds += `Password: ${newPassword}`;
      user.setPassword(newPassword);

      await user.save();

      emailManager.sendEmail(user.email, config.auth.passwordEmailSubject, config.auth.passwordEmailText + '\n' + creds);
    }
  }
  catch(err) {
    logger.auth.log('error', "Error reseting user password.", { err: err });
  }

  logger.auth.log('verbose', `Password reset for username ${request.body.username}.`);
  return reply.send({
    success: true,
    message: "If you had a valid e-mail on file, a new password was sent to you. Otherwise, you're screwed."
  })
}

module.exports = login;
