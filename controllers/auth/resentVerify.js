const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resentVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.verify) {
    throw HttpError(404, "You already verified your email");
  }
  const verificationEmail = {
    to: email,
    subject: "Verification",
    html: `<a target= "_blank" href = "${BASE_URL}/api/users/verify/${user.verificationToken}"> Click to verify email</a>`,
  };

  await sendEmail(verificationEmail);

  res.json({
    message: "We resent your verification code",
  });
};

module.exports = resentVerify;
