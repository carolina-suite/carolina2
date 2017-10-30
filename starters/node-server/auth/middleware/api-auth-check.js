
var jwt = require('jsonwebtoken');

var User = require('../models/user');

var config = require('../../site/config');

async function apiAuthCheck (request, reply, next) {

  if (!request.body.hasOwnProperty('carolinaToken')) {
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
    return reply.code(401).send({
      success: false,
      message: "Bad or expired token."
    });
  }

  request.user = await User.findOne({ username: tokenValidation.username });
  next();
}
module.exports = apiAuthCheck;
