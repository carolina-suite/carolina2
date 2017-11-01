
var Resolver = require('../../_lib/resolver');
var db = require('../../site/db');
var logger = require('../../site/logger');

async function getObject(args) {
  try {

    var app = Resolver.getApp(args.appName);
    var Model = app.models[args.modelName];
    var object = await Model.findOne({ _id: args.id });

    console.log(object);
  }
  catch (err) {
    logger.admin.log('error', "Error getting data.", { err: err });
  }
}

module.exports = getObject;
