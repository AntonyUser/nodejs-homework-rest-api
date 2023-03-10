const { User } = require("../../models");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { sendEmail } = require("../../helpers");
const { v4 } = require("uuid");

const register = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `"Email ${email} is already in use"`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const result = await User.create({
    password: hashPassword,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: " Registration confirmation",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Click for email confirmation</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
