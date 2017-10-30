
var path = require('path');

var fs = require('fs-extra');
var yaml = require('yamljs');

var Resolver = require('../../_lib/resolver');
var config = require('../config');

function gatherStatic() {
  for (var i = 0; i < config.site.includedApps.length; ++i) {
    var appName = config.site.includedApps[i];
    if (fs.existsSync(path.resolve(Resolver.getAppDir(appName), 'static'))) {
      fs.copySync(path.resolve(Resolver.getAppDir(appName), 'static'),
        path.resolve(__dirname, '..', '..', '_static', appName));
    }
  }
}
module.exports = gatherStatic;
