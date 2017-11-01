
require('console.table');

var Resolver = require('../../_lib/resolver');
var db = require('../../site/db');
var logger = require('../../site/logger');

async function listData(args) {
  try {

    var app = Resolver.getApp(args.appName);
    var Model = app.models[args.modelName];
    var query = {};

    if (args.query) query = args.query;
    var objects = await Model.find(query, null, { limit: args.pageSize, skip: (args.pageNumber - 1) * args.pageSize });

    if (Model.hasOwnProperty('getAdminFields')) {

      var table = [];
      var adminFields = Model.getAdminFields();
      for (var i = 0; i < objects.length; ++i) {
        var obj = {};
        for (var j = 0; j < adminFields.length; ++j) {
          obj[adminFields[j]] = objects[i][adminFields[j]];
        }
        table.push(obj);
      }

      console.table(table);
    }
    else {
      for (var i = 0; i < objects.length; ++i) {
        console.log(objects[i]._id);
      }
    }
  }
  catch (err) {
    logger.admin.log('error', "Error dumping data.", { err: err });
  }
}

module.exports = listData;
