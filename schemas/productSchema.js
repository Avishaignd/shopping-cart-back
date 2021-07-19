const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: String,
  productId: String,
  productType: String,
  price: Number,
  image: String,
  attributes: Array,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
