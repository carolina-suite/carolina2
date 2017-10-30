
var argparse = require('argparse');

var parser = argparse.ArgumentParser({
  addHelp: true,
  description: 'Authentication managment.',
  version: '1.0.0'
});
var subs = parser.addSubparsers({
  dest: 'subcommand',
  title: 'subcommand'
});

var createUser = subs.addParser('create-user', {
  addHelp: true
});
createUser.addArgument('username', { action: 'store' });
createUser.addArgument('password', { action: 'store' });
createUser.addArgument(['-a', '--admin'], { action: 'storeTrue' });

var args = parser.parseArgs();

if (args.subcommand=='create-user') {
  var createUserHandler = require('./bin/create-user');
  createUserHandler(args).then(() => process.exit());
}
