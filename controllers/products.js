const Product = require("../models/product");
const Order = require("../models/order");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const buyProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findOne({ _id: productID });
// console.log(product, "producttt");
  var productBought = new Order({
    product_id: product._id,
    product_name: product.name,
  });

  console.log("product bought details", productBought);

  const result = await Order.create(productBought);

  res.status(200).json({ data: result, msg: "product added", success: true });
};

const updateProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOneAndDelete({ _id: productID });
  if (!product) {
    return res.status(404).json({ msg: `no task with id: ${productID}` });
  }
  res.status(200).json("removed");
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // console.log(queryObject);
  let result = Product.find(queryObject);
  //sorting
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  buyProduct,
};
