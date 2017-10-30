
var config = require('../../../site/config');

async function updateProfile(request, reply) {

  var user = request.user;
  if (request.body.hasOwnProperty('email')) user.email = request.body.email;
  if (request.body.hasOwnProperty('name')) user.name = request.body.name;
  if (request.body.hasOwnProperty('imageUrl'))
    user.imageUrl = request.body.imageUrl;
  await user.save();
  
  return reply.send({ success: true });
}

module.exports = updateProfile;
