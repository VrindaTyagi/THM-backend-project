const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  buyProduct
} = require("../controllers/products");

const {authMiddleware} = require("../middleware/auth");
// const {checkRole} = require("../middleware/checkRole");


router.route("/").get(getAllProducts).post(authMiddleware, createProduct);
router.route("/:id").delete(authMiddleware, deleteProduct).patch(authMiddleware, updateProduct);
router.route('/buy/:id').get(buyProduct)

module.exports = router;
