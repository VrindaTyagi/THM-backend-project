const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const {authMiddleware} = require("../middleware/auth");

router.route("/").get(getAllProducts).post(authMiddleware, createProduct);
router.route("/:id").delete(authMiddleware, deleteProduct).patch(authMiddleware, updateProduct);


module.exports = router;
