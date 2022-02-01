const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).send({ msg: "cannot access, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { adminId: payload.adminId };
    next();
  } catch (error) {
    res.status(401).send({ msg: "not authorized to access this route" });
  }
};

module.exports = { authMiddleware };
