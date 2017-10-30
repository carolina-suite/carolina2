
var Resolver = require('../../_lib/resolver');
var db = require('../../site/db');

async function getObject(args) {
  try {

    var app = Resolver.getApp(args.appName);
    var Model = app.models[args.modelName];
    var object = await Model.findOne({ _id: args.id });

    console.log(object);
  }
  catch (err) { console.log(err); }
}

module.exports = getObject;
