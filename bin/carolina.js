#!/usr/bin/env node

var argparse = require('argparse');

var parser = argparse.ArgumentParser({
  addHelp: true,
  description: "Scaffolder for projects.",
  version: '2.0.0'
});
var subs = parser.addSubparsers({
  dest: 'sub',
  title: 'subcommand'
});

var newProject = subs.addParser('new', {
  addHelp: true
});
newProject.addArgument('templateName', {
  addHelp: true,
  help: "Name of the template."
});
newProject.addArgument('projectName', {
  addHelp: true,
  help: "Name of the project to create."
});
newProject.addArgument('addons', {
  addHelp: true,
  nargs: '*'
});

var args = parser.parseArgs();
if (args.sub=='new') {
  require('./new-project')(args, true);
}
