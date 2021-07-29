const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const product = require("./product");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 25,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 300,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(9);
  const hashed = await bcrypt.hash(this.password, salt);
  this.password = hashed;
  next();
});

userSchema.methods.genAuthToken = function () {
  return jwt.sign(this.toJSON(), config.SECRET_KEY);
};

userSchema.methods.checkPassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};
module.exports = User = mongoose.model("user", userSchema);
