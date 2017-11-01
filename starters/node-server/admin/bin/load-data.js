
var path = require('path');

var Resolver = require('../../_lib/resolver');

var db = require('../../site/db');
var logger = require('../../site/logger');

async function loadData(args) {
  try {
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
          await obj[functionField.functionName].apply(obj, functionField.args);
        }
      }

      await obj.save();
      logger.admin.log('info', `New ${entry.model.app}.models.${entry.model.model} (${obj._id}) saved.`);
    }
  }
  catch(err) {
    console.log(err);
  }
}

module.exports = loadData;
