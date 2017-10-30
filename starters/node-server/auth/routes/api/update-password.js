
async function updatePassword(request, reply) {

  var user = request.user;
  if (!(request.body.hasOwnProperty('oldPassword') && request.body.hasOwnProperty('newPassword'))) {
    return reply.code(400).send({
      success: false,
      message: "Old and new passwords required."
    });
  }
  if (!user.checkPassword(request.body.oldPassword)) {
    return reply.code(400).send({
      success: false,
      message: "Provided password is incorrect."
    });
  }
  else {

    user.setPassword(request.body.newPassword);
    await user.save();

    return reply.send({ success: true });
  }
}

module.exports = updatePassword;
