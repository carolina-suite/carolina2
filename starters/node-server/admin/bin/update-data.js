
var Resolver = require('../../_lib/resolver');
var db = require('../../site/db');

async function updateData(args) {
  try {
    console.log(args);
    var app = Resolver.getApp(args.appName);
    var Model = app.models[args.modelName];
    await Model.updateMany(args.query, args.update);
  }
  catch (err) { console.log(err); }
}

module.exports = updateData;
