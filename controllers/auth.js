const Admin = require("../models/admin");

const register = async (req, res) => {
  const admin = await Admin.create({ ...req.body });
  const token = admin.createJWT();
  res.status(200).json({ msg: "admin created", token });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ msg: "please provide email and password" });
  }
  const admin = await Admin.findOne({ username });

  if (!admin) {
    res.status(401).send({ msg: "invalid credentials" });
  }

  const isPasswordCorrect = await admin.comparePassword(password);

  if (!isPasswordCorrect) {
    res.status(401).send({ msg: "invalid credentials" });
  }

  const token = admin.createJWT();
  res.status(200).json({ msg: "logged in", token });
};

module.exports = { register, login };
