const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({

  currentRole: {
    type: String,
    value: "user",
  },
});

module.exports = mongoose.model("Role", roleSchema);
