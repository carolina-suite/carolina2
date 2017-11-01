
var Resolver = require('../../_lib/resolver');

var db = require('../../site/db');
var logger = require('../../site/logger');

async function updateData(args) {
  try {
    var app = Resolver.getApp(args.appName);
    var Model = app.models[args.modelName];
    await Model.updateMany(args.query, args.update);
    logger.admin.log('info', `Updates applied to ${args.appName}.models.${args.modelName}.`);
  }
  catch (err) {
    logger.admin.log('error', "Error updating data.", { err: err });
  }
}

module.exports = updateData;
