require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const productRouter = require("./routes/product");
// const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");
//schema

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

connect();
server.use(cors());
server.use(express.json());
server.use(morgan("default"));
server.use(express.static("public"));
server.use("/products", productRouter.router);
// server.use("/users", userRouter.router);
// server.use('*',(req,res) => { res.sendFile(path.resolve(__dirname,"build/index.html"))}) use for set
// to directs to route to react route
server.listen(process.env.PORT, () => {
  console.log("server started");
});
