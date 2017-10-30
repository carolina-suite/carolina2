
var Resolver = require('../../_lib/resolver');
var db = require('../../site/db');

async function dropTable(app, modelName, query) {
  var Model = app.models[modelName];
  await Model.remove(query);
}

async function dropData(args) {
  try {
    var app = Resolver.getApp(args.app);
    if (args.model == null) {
      for (var modelName in app.models) {
        if (app.models.hasOwnProperty(modelName)) {
          await dropTable(app, modelName);
        }
      }
    }
    else {
      if (args.query) {
        await dropTable(app, args.model, args.query);
      }
      else {
        await dropTable(app, args.model, {});
      }
    }
  }
  catch (err) { console.log(err); }
}

module.exports = dropData;
