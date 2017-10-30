
module.exports = function(fastify, options, next) {

  fastify.get('/', require('./views'));

  fastify.post('/api/login', require('./api/login'));
  fastify.post('/api/register', require('./api/register'));
  fastify.post('/api/forgot', require('./api/forgot'));

  var authCheck = require('../middleware/api-auth-check');
  fastify.post('/api/check', { beforeHandler: authCheck }, require('./api/check'));
  fastify.post('/api/get-profile', { beforeHandler: authCheck }, require('./api/get-profile'));
  fastify.post('/api/update-profile', { beforeHandler: authCheck }, require('./api/update-profile'));
  fastify.post('/api/update-password', { beforeHandler: authCheck }, require('./api/update-password'));

  next();
};
