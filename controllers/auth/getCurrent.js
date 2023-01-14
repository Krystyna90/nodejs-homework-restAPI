const getCurrent = (req, res) => {
  const { email } = req.user;
  res.json({ email });
  console.log(req.user);
};

module.exports = getCurrent;
