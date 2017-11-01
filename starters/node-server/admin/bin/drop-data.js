
var Resolver = require('../../_lib/resolver');

var db = require('../../site/db');
var logger = require('../../site/logger');

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
          logger.admin.log('info', `Dropped instances of ${args.app}.models.${modelName}.`);
        }
      }
    }
    else {
      if (args.query) {
        await dropTable(app, args.model, args.query);
        logger.admin.log('info', `Dropped instances of ${args.app}.models.${args.model}.`);
      }
      else {
        await dropTable(app, args.model, {});
        logger.admin.log('info', `Dropped table ${args.app}.models.${args.model}.`);
      }
    }
  }
  catch (err) {
    logger.admin.log('error', 'Error dropping data.', { err: err });
  }
}

module.exports = dropData;
