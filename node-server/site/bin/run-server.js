
var path = require('path');

const fastify = require('fastify');
const fastifyPug = require('fastify-pug');
const fastifyStatic = require('fastify-static');

var gatherTemplates = require('./gather-templates');
var gatherStatic = require('./gather-static');
var buildJs = require('./build-js');

var Resolver = require('../../_lib/resolver');

var config = require('../config');
var db = require('../db');

function runServer(args) {

  gatherTemplates();
  buildJs();
  gatherStatic();

  var pugBaseDir = path.join(__dirname, '..', '..', '_templates');

  var server = fastify();
  server.register(fastifyPug, { views: path.join(__dirname, '..', '..', '_templates') });
  server.register(fastifyStatic, {
    root: path.join(__dirname, '..', '..', '_static'),
    prefix: '/static/'
  });

  for (var i = 0; i < config.site.includedApps.length; ++i) {
    var app = Resolver.getApp(config.site.includedApps[i]);
    if (app.hasOwnProperty('router')) {
      server.register(app.router, { prefix: '/' + config.site.includedApps[i] });
    }
  }

  server.listen(args.port, function(err) {
    if (err) throw err;
    console.log(`Server listening on port ${args.port}.`);
  });
}
module.exports = runServer;
