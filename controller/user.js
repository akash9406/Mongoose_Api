const fs = require("fs");
const model = require("../model/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");
const User = model.User;
// auth private key
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

exports.signUp = async (req, res) => {
  try {
    const user = new User(req.body);
    var token = jwt.sign({ id: user._id }, privateKey, { algorithm: "RS256" });
    const hashed = bcrypt.hashSync(req.body.password, 10);
    console.log(user.password);
    user.password = hashed;
    console.log(user.password);
    user.token = token;
    const output = await user.save();
    res.status(201).json({
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });

    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      var token = jwt.sign({ id: doc._id }, privateKey, {
        algorithm: "RS256",
      });
      doc.token = token;
      const output = await doc.save();
      res.status(201).json({
        token,
      });
    } else {
      res.status(401).json({
        message: "incorrect password",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    console.log({ id });
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.replaceUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (error) {
    console.log(error);
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
