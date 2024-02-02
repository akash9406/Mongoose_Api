const fs = require("fs");
const model = require("../model/product");
const Product = model.Product;

//Create
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const output = await product.save();
    res.status(201).json(output);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
//read
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json(products);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.replaceProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
