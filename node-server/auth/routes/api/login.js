
var config = require('../../../site/config');

var passwordCheck = require('../../lib/password-check');
var User = require('../../models/user');

async function login(request, reply) {

  if (!(request.body.hasOwnProperty('username') && request.body.hasOwnProperty('password'))) {
    reply.status(401).send({
      success: false,
      message: "Username and password required."
    });
  }

  var passwordCheckResult = await passwordCheck(request.body.username, request.body.password);
  if (passwordCheckResult.success) {
    var token = passwordCheckResult.user.generateJwtToken(config.site.secretKey);
    reply.code(200).send({
      success: true,
      token: token
    });
  }
  else {
    reply.code(401).send({
      success: false,
      message: "Bad username or password."
    });
  }
}

module.exports = login;
