require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const productRouter = require("./routes/product");
// const userRouter = require("./routes/user");
const mongoose = require("mongoose");

//schema

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

connect();

server.use(express.json());
server.use(morgan("default"));
server.use(express.static("public"));
server.use("/products", productRouter.router);
// server.use("/users", userRouter.router);

server.listen(process.env.PORT, () => {
  console.log("server started");
});
