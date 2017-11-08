
async function echoHandler(context) {
  await context.sendText(context.event.text);
}

module.exports = echoHandler;
