const express = require("express");
const Product = require("../models/product");
const auth = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  let products = [];
  for (product of req.user.cart) {
    const fullProduct = await Product.findById(product._id);
    products.push(fullProduct);
  }
  return res.send(products);
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  req.user.cart = req.user.cart.filter((p) => {
    return String(p) !== id;
  });
  console.log("req", req.user.cart);

  return res.send(await req.user.save());
});

router.put("/add", auth, async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  if (!id) return res.status(400).send("id is requird");

  const product = await Product.findById(id);

  if (!product) return res.status(400).send("product not found");

  console.log("cart", req.user);

  if (req.user.cart.includes(product._id)) {
    return res.status(400).send("the product is in the cart");
  }

  const user = await User.findByIdAndUpdate(req.user._id, {
    cart: [...req.user.cart, product._id],
  });
  console.log("cart2", user);
  return res.send(user);
});

module.exports = router;
