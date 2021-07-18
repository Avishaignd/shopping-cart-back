const Product = require('../productSchema')
const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL);

const getProducts = async (req, res) => {
    // Product.find(function (err, products) {
    //     if (err) return console.error(err);
    //     res.send(products);
    //   });
    console.log("hello");
}

module.exports = { getProducts }