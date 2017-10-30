
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

var gatherTemplates = subs.addParser('gather-templates', {
  addHelp: true,
  description: "Gathers all site templates into one place."
});

var buildJs = subs.addParser('build-js', {
  addHelp: true,
  description: "Runs on the JS builds for your app workspaces."
});

var runServer = subs.addParser('run', {
  addHelp: true,
  description: "Runs the fastify server."
});
runServer.addArgument(['-p', '--port'], {
  addHelp: true,
  defaultValue: 8001,
  help: "The port to listen on."
})

var args = parser.parseArgs();
if (args.subcommand=='build-js') {
  var handler = require('./bin/build-js');
  handler();
}
if (args.subcommand=='gather-templates') {
  var handler = require('./bin/gather-templates');
  handler();
}
if (args.subcommand=='run') {
  var handler = require('./bin/run-server');
  handler(args);
}
