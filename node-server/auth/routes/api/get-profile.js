
var config = require('../../../site/config');

async function getProfile(request, reply) {
  var obj = {};
  obj.username = request.user.username;
  obj.email = request.user.email || null;
  obj.name = request.user.name || null;
  obj.isAdmin = request.user.isAdmin;
  obj.imageUrl = request.user.imageUrl || null;
  reply.send(obj);
}

module.exports = getProfile;
