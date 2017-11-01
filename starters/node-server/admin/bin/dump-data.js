
require('console.table');

var Resolver = require('../../_lib/resolver');
var db = require('../../site/db');
var logger = require('../../site/logger');

async function listData(args) {
  try {

    var app = Resolver.getApp(args.appName);
    var Model = app.models[args.modelName];
    var jsonData = await Model.find({}).lean();
    console.log(JSON.stringify(jsonData));

  }
  catch (err) {
    logger.admin.log('error', "Error dumping data.", { err: err });
  }
}

module.exports = listData;
