const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  title: { type: String, required: true, unqiue: true },
  description: String,
  price: { type: Number, min: [0, "Wrong price"], required: true },
  discountPercentage: {
    type: Number,
    min: [0, "Wrong discount"],
    max: [50, "wrong discount"],
  },
  rating: { type: Number, min: [0, "Wrong rating"], max: [5, "wrong rating"] },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
  // String is shorthand for {type: String}
});
exports.Product = mongoose.model("Product", productSchema);
