const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username) return res.status(400).send("user name is require");
  if (!password) return res.status(400).send("password is require");
  const user = await User.findOne({ username });
  if (!user) return res.status(404).send("user dos not exist");
  console.log(user.checkPassword);
  const isMatch = await user.checkPassword(password);
  if (!isMatch) return res.status(404).send("password dos not match");
  console.log(isMatch);
  return res.send(user.genAuthToken());
});

module.exports = router;
