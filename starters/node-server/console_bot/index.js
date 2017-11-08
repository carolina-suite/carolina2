
var ConsoleBot = require('bottender').ConsoleBot;

var handler = require('./handlers');

var bot = new ConsoleBot();
bot.onEvent(async context => {
  await handler(context);
});
bot.createRuntime();
