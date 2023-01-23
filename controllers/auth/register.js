const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verificationEmail = {
    to: email,
    subject: "Verification",
    html: `<a target= "_blank" href = "${BASE_URL}/api/users/verify/${verificationToken}"> Click to verify email</a>`,
  };

  await sendEmail(verificationEmail);

  res.status(201).json({
    email: newUser.email,
  });
};

module.exports = register;
