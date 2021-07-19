const Product = require("../schemas/productSchema");
const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL);

const getProducts = async (req, res) => {
  Product.find(function (err, products) {
    if (err) return console.error(err);
    res.send(products);
  });
};

const AddProduct = async (req, res) => {
  const prodToAdd = req.body;
  if (prodToAdd.productId === "") {
    prodToAdd.productId = Math.random();
  }
  if (prodToAdd.image === "") {
    prodToAdd.image = "http://placekitten.com/200/300";
  }
  const product = new Product(prodToAdd)
  product.save((function (err, product){
      if (err) return console.error(err)
      else res.json(product)
  }))
};

module.exports = { getProducts, AddProduct };
