
var config = require('../../../site/config');

var User = require('../../models/user');

async function register(request, reply) {

  var user = new User();
  user.username = request.body.username;
  if (request.body.hasOwnProperty('email')) user.email = request.body.email;
  if (request.body.hasOwnProperty('name')) user.name = request.body.name;

  user.setPassword(request.body.password);

  try {
    var user = await user.save();
  }
  catch(err) {
    return reply.code(400).send({
      success: false,
      message: "Database error or user with that username already exists."
    });
  }

  var token = user.generateJwtToken(config.site.secretKey);

  reply.code(200).send({
    success: true,
    token: token
  });
}
module.exports = register;
