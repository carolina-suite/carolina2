
var config = require('../../../site/config');
var logger = require('../../../site/logger');

var passwordCheck = require('../../lib/password-check');
var User = require('../../models/user');

async function login(request, reply) {

  if (!(request.body.hasOwnProperty('username') && request.body.hasOwnProperty('password'))) {
    logger.auth.log('warn', "Login failed. Username and password required.");
    reply.status(401).send({
      success: false,
      message: "Username and password required."
    });
  }

  var passwordCheckResult = await passwordCheck(request.body.username, request.body.password);
  if (passwordCheckResult.success) {

    var token = passwordCheckResult.user.generateJwtToken(config.site.secretKey);

    logger.auth.log('info', `Successful login by ${request.body.username}`);
    logger.auth.log('verbose', `Created user token ${token} for ${request.body.username}`);

    reply.code(200).send({
      success: true,
      token: token
    });
  }
  else {
    logger.auth.log('verbose', "Login failed. Bad username or password.");
    reply.code(401).send({
      success: false,
      message: "Bad username or password."
    });
  }
}

module.exports = login;
