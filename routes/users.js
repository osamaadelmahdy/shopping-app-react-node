const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log("user and pass", username, password);
  let user = await User.findOne({ username });
  if (user) return res.status(400).send("user taken");
  user = new User({ username, password });
  await user.save();
  return res.send({
    token: user.genAuthToken(),
  });
});

module.exports = router;
