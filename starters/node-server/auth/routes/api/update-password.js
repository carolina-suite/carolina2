
var logger = require('../../../site/logger');

async function updatePassword(request, reply) {

  var user = request.user;
  if (!(request.body.hasOwnProperty('oldPassword') && request.body.hasOwnProperty('newPassword'))) {
    logger.auth.log('warn', "Password update failed. Old and new passwords required.");
    return reply.code(400).send({
      success: false,
      message: "Old and new passwords required."
    });
  }
  if (!user.checkPassword(request.body.oldPassword)) {
    logger.auth.log('verbose', "Password update failed. Provided password is incorrect.");
    return reply.code(400).send({
      success: false,
      message: "Provided password is incorrect."
    });
  }
  else {

    user.setPassword(request.body.newPassword);
    await user.save();
    logger.auth.log('info', `Password reset for ${user.username}.`);

    return reply.send({ success: true });
  }
}

module.exports = updatePassword;
