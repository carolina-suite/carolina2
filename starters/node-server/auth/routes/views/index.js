
var path = require('path');
var config = require('../../../site/config');

function main(request, reply) {
  reply.render('auth/auth_react.pug', {
    appName: 'auth',
    config: config,
    basedir: path.join(__dirname, '..', '..', '..', '_templates')
  })
}
module.exports = main;
