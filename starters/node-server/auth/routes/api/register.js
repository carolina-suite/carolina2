
var config = require('../../../site/config');
var logger = require('../../../site/logger');

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
    logger.auth.log('warn', "Registration failed. Database error or user with that username already exists.");
    return reply.code(400).send({
      success: false,
      message: "Database error or user with that username already exists."
    });
  }

  var token = user.generateJwtToken(config.site.secretKey);
  logger.auth.log('info', `Created new user ${user.username}`);
  logger.auth.log('verbose', `Created user token ${token} for ${user.username}`);

  reply.code(200).send({
    success: true,
    token: token
  });
}
module.exports = register;
