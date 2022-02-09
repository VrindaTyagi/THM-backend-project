const Admin = require("../models/admin");
const Role = require("../models/role");

const register = async (req, res) => {
  const admin = await Admin.create({ ...req.body });
  const token = admin.createJWT();
  res.status(200).json({ msg: "admin created", token });
  // const role_to_assign = Role.schema.path('roles').enumValues[0]
  Role.findOneAndUpdate(
    { currentRole: "user" },
    { currentRole: "admin" },
    { new: true,  upsert: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(doc);
    }
  );
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
