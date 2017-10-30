
async function check(request, reply, next) {
  return reply.send({ success: true });
}
module.exports = check;
