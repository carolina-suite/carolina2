
var path = require('path');

var db = require('../../site/db');
var Resolver = require('../../_lib/resolver');

async function loadData(args) {

  var fixtureDir = path.join(Resolver.getAppDir(args.appName), 'fixtures');
  fixture = require(path.join(fixtureDir, `${args.fixture}`));

  for (var i = 0; i < fixture.length; ++i) {

    var entry = fixture[i];
    var app = Resolver.getApp(entry.model.app);
    var Model = app.models[entry.model.model];
    var obj = new Model(entry.fields);
    if (entry.hasOwnProperty('functionFields')) {
      for (var j = 0; j < entry.functionFields.length; ++j) {
        var functionField = entry.functionFields[j];
        obj[functionField.functionName].apply(obj, functionField.args);
      }
    }
    
    await obj.save();
    console.log(obj);
  }
}

module.exports = loadData;
