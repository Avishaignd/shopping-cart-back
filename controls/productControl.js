const Product = require("../schemas/productSchema");
const cloudinary = require('cloudinary').v2;
const fs = require('fs')
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const getProducts = async (req, res) => {
  Product.find(function (err, products) {
    if (err) return console.error(err);
    res.send(products);
  });
};

const addProduct = (req, res) => {
  console.log(req.body);
  console.log("req-file-path", req.file.path);
  const path = req.file.path
  cloudinary.uploader.upload(
      path,
      { public_id: `shopping-cart/${req.body.productName}-${new Date().toISOString()}` },
      function (err, image) {
          // , "connection error, new product was not saved"
          if (err) {
              res.status(500).send(err)
          }
          else {
              console.log('image uploaded to Cloudinary')
              fs.unlinkSync(path)
              const prodToAdd = req.body;
              const product = new Product(prodToAdd)
              product.image = image.secure_url
              product.save((function (err, product) {
                  // , "connection error, new product was not saved"
                  if (err) { return res.status(500).send(err) }
                  // "product added"
                  else {
                      console.log(product);
                      return res.status(200).send(product)
                  }
              }))
          }
      }
  )

}

module.exports = { getProducts, addProduct };
