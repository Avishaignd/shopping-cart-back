const mongoose = require("mongoose");
require("dotenv").config();
const User = require('../schemas/userSchema')

const addProductToCart = async (req, res) => {
    // console.log(req.body);
    const {item, user} = req.body
    const userToUpdate = await User.findOne({_id: user})
    userToUpdate.cart.push(item)
    await userToUpdate.save()
    // console.log(userToUpdate);
    res.status(200).json(userToUpdate)
}

const removeProductFromCart = async (req, res) => {
    // console.log(req.body);
    const {item, user} = req.body
    // const userToUpdate = await User.findOne({_id: user})
    User.updateOne({ _id: user }, { "$pull": { "cart": { "_id": item._id } }}, { safe: true, multi:true }, function(err, obj) {
        console.log(obj);
    });
    // userToUpdate.cart.pull({productId: item.productId})
    // await userToUpdate.save()
    // console.log(userToUpdate);
    res.status(200)
}

module.exports = { addProductToCart, removeProductFromCart }