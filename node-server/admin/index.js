
var argparse = require('argparse');

var parser = argparse.ArgumentParser({
  addHelp: true,
  description: 'Site managment.',
  version: '1.0.0'
});
var subs = parser.addSubparsers({
  dest: 'subcommand',
  title: 'subcommand'
});

var loadData = subs.addParser('load-data', {
  addHelp: true,
  description: "Loads powmedia mongoose fixtures from <appName>/fixtures/<fixtureName>.js."
});
loadData.addArgument('appName', {
  addHelp: true,
  help: "App containing the fixture file(s)."
});
loadData.addArgument('fixture', {
  addHelp: true,
  help: "Fixture file to load (without extension)."
});

var listData = subs.addParser('list-data', {
  addHelp: true,
  description: "Lists a page of database objects."
});
listData.addArgument('appName', {
  addHelp: true,
  help: "App containing the model."
});
listData.addArgument('modelName', {
  addHelp: true,
  help: "Model to list."
});
listData.addArgument(['-p', '--pageNumber'], {
  addHelp: true,
  defaultValue: 1,
  help: "Page number to show.",
  type: Number
});
listData.addArgument(['-s', '--pageSize'], {
  addHelp: true,
  defaultValue: 50,
  help: "Page size.",
  type: Number
});
listData.addArgument(['-q', '--query'], {
  addHelp: true,
  help: "Local query to run from site/queries."
});

var getObject = subs.addParser('get-object', {
  addHelp: true,
  description: "Displays a specific model object by id."
});
getObject.addArgument('appName', {
  addHelp: true,
  help: "App containing the model."
});
getObject.addArgument('modelName', {
  addHelp: true,
  help: "Model to query."
});
getObject.addArgument('id', {
  addHelp: true,
  help: "Id of desired object."
});

var updateData = subs.addParser('update-data', {
  addHelp: true,
  description: "Update data matching a criteria."
});
updateData.addArgument('appName', {
  addHelp: true,
  help: "App containing the model to update."
});
updateData.addArgument('modelName', {
  addHelp: true,
  help: "Model to update."
});
updateData.addArgument('query', {
  addHelp: true,
  help: "Query in site/queries to match."
});
updateData.addArgument('update', {
  addHelp: true,
  help: "Query in site/queries to apply as an update."
});

var dropData = subs.addParser('drop-data', {
  addHelp: true,
  description: "Drops all the data for a specific app, or just a single model if provided."
});
dropData.addArgument('app', {
  action: 'store',
  help: 'App to drop.'
});
dropData.addArgument(['-m', '--model'], {
  action: 'store',
  help: "Model to drop."
});
dropData.addArgument(['-q', '--query'], {
  addHelp: true,
  help: "Local query to run from site/queries (only used if model specified)."
});

var args = parser.parseArgs();
if (args.subcommand=='load-data') {
  var handler = require('./bin/load-data');
  handler(args).then(()=>process.exit());
}
if (args.subcommand=='list-data') {
  if (args.query)
    args.query = require(`../site/queries/${args.query}`);
  var handler = require('./bin/list-data');
  handler(args).then(()=>process.exit());
}
if (args.subcommand=='get-object') {
  var handler = require('./bin/get-object');
  handler(args).then(()=>process.exit());
}
if (args.subcommand=='update-data') {
  args.query = require(`../site/queries/${args.query}`);
  args.update = require(`../site/queries/${args.update}`);
  var handler = require('./bin/update-data');
  handler(args).then(()=>process.exit());
}
if (args.subcommand=='drop-data') {
  if (args.query)
    args.query = require(`../site/queries/${args.query}`);
  var handler = require('./bin/drop-data');
  handler(args).then(()=>process.exit());
}
