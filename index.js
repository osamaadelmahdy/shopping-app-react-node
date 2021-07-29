const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const auth = require("./routes/auth");
const product = require("./routes/product");
const cart = require("./routes/cart");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/auth", auth);
app.use("/api/products", product);
app.use("/api/cart", cart);
mongoose
  .connect(
    "mongodb+srv://osama:12345@main.s1llf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((err) => console.log(err))
  .then((c) => console.log("connected"));

app.listen("5000");
