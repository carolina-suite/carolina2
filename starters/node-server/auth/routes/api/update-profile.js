
var config = require('../../../site/config');
var logger = require('../../../site/logger');

async function updateProfile(request, reply) {

  var user = request.user;
  if (request.body.hasOwnProperty('email')) user.email = request.body.email;
  if (request.body.hasOwnProperty('name')) user.name = request.body.name;
  if (request.body.hasOwnProperty('imageUrl'))
    user.imageUrl = request.body.imageUrl;
  await user.save();
  logger.auth.log('info', `Profile for ${user.username} updated.`);

  return reply.send({ success: true });
}

module.exports = updateProfile;
