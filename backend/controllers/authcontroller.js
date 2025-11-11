const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { first, last, email, pass, dob, phone } = req.body;

  const hashedPassword = await bcrypt.hash(pass, 10);

  await User.create({ first, last, email, pass: hashedPassword, dob, phone });

  res.send({ message: "Account Created Successfully ✅" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ message: "User not found" });

  const validPass = await bcrypt.compare(password, user.pass);
  if (!validPass) return res.status(400).send({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "SECRET123");

  res.send({ token });
};
