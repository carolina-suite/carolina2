
var echoHandler = require('./echo-handler');

async function mainHandler(context) {
  if (true) {
    await echoHandler(context);
  }
}
module.exports = mainHandler;
