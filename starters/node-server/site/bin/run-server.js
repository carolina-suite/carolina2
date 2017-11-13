
var path = require('path');

const fastify = require('fastify');
const fastifyPug = require('fastify-pug');
const serveStatic = require('serve-static');

var gatherTemplates = require('./gather-templates');
var gatherStatic = require('./gather-static');
var buildJs = require('./build-js');

var Resolver = require('../../_lib/resolver');

var config = require('../config');
var db = require('../db');
var logger = require('../logger');

function runServer(args) {

  gatherTemplates();
  buildJs();
  gatherStatic();

  var pugBaseDir = path.join(__dirname, '..', '..', '_templates');

  var server = fastify();
  server.register(fastifyPug, { views: path.join(__dirname, '..', '..', '_templates') });
  server.use('/static/', serveStatic(path.join(__dirname, '..', '..', '_static')));

  for (var i = 0; i < config.site.includedApps.length; ++i) {
    var app = Resolver.getApp(config.site.includedApps[i]);
    if (app.hasOwnProperty('crons')) {
      for (var j = 0; j < app.crons.length; ++j) {
        var cron = app.crons[j];
        if (cron.runInit) cron.func();
        console.log('set interval');
        setInterval(cron.func, cron.interval);
      }
    }
    if (app.hasOwnProperty('router')) {
      var mount = '/' + config.site.includedApps[i];
      if (mount == '/home') mount = '';
      server.register(app.router, { prefix: mount });
    }
  }

  server.addHook('preHandler', function(request, reply, next) {
    logger.site.log('verbose', `${request.req.method} ${request.req.url} from ${request.req.socket.remoteFamily} ${request.req.socket.remoteAddress}:${request.req.socket.remotePort}.`);
    next();
  });
  server.listen(args.port, function(err) {
    if (err) throw err;
    logger.site.log('info', `Server listening on port ${args.port}.`);
  });
}
module.exports = runServer;
