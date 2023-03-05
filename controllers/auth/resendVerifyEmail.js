const { User } = require("../../models");
const createError = require("http-errors");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404, " User not found");
  }
  if (user.verify) {
    throw createError(400, " User are already verified");
  }
  const mail = {
    to: email,
    subject: " Registration confirmation",
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Click for email confirmation</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Email verification resent",
  });
};

module.exports = resendVerifyEmail;
