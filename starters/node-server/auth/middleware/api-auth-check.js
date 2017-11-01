
var jwt = require('jsonwebtoken');

var User = require('../models/user');

var config = require('../../site/config');
var logger = require('../../site/logger');

async function apiAuthCheck (request, reply, next) {

  if (!request.body.hasOwnProperty('carolinaToken')) {
    logger.auth.log('verbose', 'Request rejected. No token provided.');
    return reply.code(401).send({
      success: false,
      message: "No token provided."
    });
  }

  var tokenValidation = null;

  try {
    tokenValidation = jwt.verify(request.body.carolinaToken, config.site.secretKey);
  }
  catch(err) {
    logger.auth.log('verbose', 'Request rejected. Bad or expired token.');
    return reply.code(401).send({
      success: false,
      message: "Bad or expired token."
    });
  }

  request.user = await User.findOne({ username: tokenValidation.username });
  logger.auth.log('verbose', `Request permitted with authenticated user ${request.user.username}.`);
  next();
}
module.exports = apiAuthCheck;
