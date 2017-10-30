
var fs = require('fs');
var path = require('path');

this.getApp = function(appName) {
  if (fs.existsSync(path.join(__dirname, `../${appName}/app.js`))) {
    return require(`../${appName}/app`);
  }
  else return require(appName);
};
this.getAppDir = function(appName) {
  if (fs.existsSync(path.join(__dirname, `../${appName}`))) {
    return path.join(__dirname, `../${appName}`);
  }
  else return path.join(__dirname, `../node_modules/${appName}`);
};
