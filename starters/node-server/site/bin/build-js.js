
var path = require('path');

var fs = require('fs-extra');
var yaml = require('yamljs');

var Resolver = require('../../_lib/resolver');
var config = require('../config');

function buildJs() {
  for (var i = 0; i < config.site.includedApps.length; ++i) {
    var appName = config.site.includedApps[i];
    if (fs.existsSync(path.resolve(Resolver.getAppDir(config.site.includedApps[i]), 'workspace'))) {
      fs.copySync(path.resolve(Resolver.getAppDir(appName), 'workspace'),
        path.resolve(__dirname, '..', '..', '_workspace', appName));
    }
  }
  for (var i = 0; i < config.site.includedApps.length; ++i) {
    var appName = config.site.includedApps[i];
    var app = Resolver.getApp(config.site.includedApps[i]);
    if (app.workspace) {
      if (fs.existsSync(path.resolve(Resolver.getAppDir(config.site.includedApps[i]), 'workspace', 'build.yml'))) {
        var buildConfig = yaml.load(path.resolve(Resolver.getAppDir(config.site.includedApps[i]), 'workspace', 'build.yml'));
        for (var prop in buildConfig.jsBuilds) {
          if (buildConfig.jsBuilds.hasOwnProperty(prop)) {

            var buildOrder = buildConfig.jsBuilds[prop];
            var buildString = '';
            if (buildOrder.hasOwnProperty('vueTemplates')) {
              buildString = 'var TEMPLATES = {};\n'
              for (var vueTemplateProp in buildOrder.vueTemplates) {
                var htmlTemplate = fs.readFileSync(path.resolve(__dirname, '..', '..', '_workspace', buildOrder.vueTemplates[vueTemplateProp])).toString();
                var templateApp = buildOrder.vueTemplates[vueTemplateProp].split('/')[0];
                buildString += 'TEMPLATES["' + templateApp + '/' + vueTemplateProp + '"] = `' + htmlTemplate + '`;\n';
              }
            }
            if (buildOrder.hasOwnProperty('src')) {
              for (var srcProp in buildOrder.src) {
                var jsString = fs.readFileSync(path.resolve(__dirname, '..', '..', '_workspace', buildOrder.src[srcProp])).toString();
                buildString += jsString;
              }
            }
            fs.writeFileSync(path.resolve(Resolver.getAppDir(appName), 'static', buildOrder.out), buildString);
          }
        }
      }
    }
  }
}

module.exports = buildJs;
