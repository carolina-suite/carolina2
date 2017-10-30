
var path = require('path');
var config = require('../site/config');

this.router = function(fastify, options, next) {

  fastify.get('/', function(request, reply) {
    reply.render('site/landing_page.pug', {
      appName: 'starter',
      config: config,
      basedir: path.join(__dirname, '..', '_templates')
    });
  });

  next();
};
