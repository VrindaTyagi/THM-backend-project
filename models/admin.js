const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
});

adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.createJWT = function () {
  return jwt.sign(
    { adminId: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

adminSchema.methods.comparePassword = async function (adminPassword) {
  const isMatch = await bcrypt.compare(adminPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Admin", adminSchema);
