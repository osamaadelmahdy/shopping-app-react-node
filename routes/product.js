const express = require("express");
const User = require("../models/product");
const authMid = require("../middleware/auth");
const Product = require("../models/product");
const router = express.Router();

router.get("/", async (req, res) => {
  const product = await Product.find();
  return res.send(product);
});

router.post("/", authMid, async (req, res) => {
  const { title, about, img, price } = req.body;

  let product = new Product({ title, about, img, price, user: req.user._id });
  product = await product.save();
  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("user");
  if (!product) res.status(401).send("can not find this product");
  return res.send(product);
});

module.exports = router;
