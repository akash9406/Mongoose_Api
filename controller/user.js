const fs = require("fs");
const model = require("../model/user");
const mongoose = require("mongoose");
const User = model.User;
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    var token = jwt.sign({ id: user._id }, process.env.SECRET);
    user.token = token;
    const output = await user.save();
    res.status(201).json(output);
  } catch (error) {
    res.status(400).json({
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
