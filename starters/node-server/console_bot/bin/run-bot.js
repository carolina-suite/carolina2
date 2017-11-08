
var ConsoleBot = require('bottender');

function runBot(args) {
  var bot = new ConsoleBot();
  bot.onEvent(async context => {
    await context.sendText(event.text);
  });
  bot.createRuntime();
}
module.exports = runBot;
