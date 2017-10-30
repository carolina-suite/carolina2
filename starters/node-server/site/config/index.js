
var fs = require('fs');
var path = require('path');

var _ = require('underscore');
var yaml = require('yamljs');

var Resolver = require('../../_lib/resolver');

var siteConfig = yaml.load(path.join(__dirname, 'site.yml'));
siteConfig = _.extend(siteConfig, yaml.load(path.join(__dirname, 'site.secret.yml')));
var config = {
  site: siteConfig
};

for (var i = 0; i < siteConfig.includedApps.length; ++i) {

  if (siteConfig.includedApps[i] == 'site') continue;

  var appConfig = {};
  var appConfigDefaultFile = path.join(Resolver.getAppDir(siteConfig.includedApps[i]), 'config.yml');

  if (fs.existsSync(appConfigDefaultFile)) {
    appConfig = yaml.load(appConfigDefaultFile);
  }

  var appConfigFile = path.join(__dirname, `${siteConfig.includedApps[i]}.yml`);
  if (fs.existsSync(appConfigFile)) {
    appConfig = _.extend(appConfig, yaml.load(appConfigFile));
  }
  config[siteConfig.includedApps[i]] = appConfig;
}

module.exports = config;
