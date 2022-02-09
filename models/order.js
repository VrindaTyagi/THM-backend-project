const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product_id: String,
  product_name: String,
});

module.exports = mongoose.model("Order", orderSchema);
