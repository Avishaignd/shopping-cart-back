require("dotenv").config();
const User = require('../schemas/userSchema')
const Transaction = require('../schemas/transactionSchema')

const addProductToCart = async (req, res) => {
    const {item, user} = req.body
    const userToUpdate = await User.findOne({_id: user})
    userToUpdate.cart.push(item)
    await userToUpdate.save()
    res.status(200).json(userToUpdate)
}

const getUser = async (req, res) => {
    const {id} = req.params
    const user = await User.findOne({_id: id})
    res.send(user)
}

const removeProductFromCart = async (req, res) => {
    const {item, user} = req.body
    User.updateOne({ _id: user }, { "$pull": { "cart": { "_id": item._id } }}, { safe: true, multi:true }, function(err, obj) {
        console.log(obj);
    });
    res.status(200)
}

const checkout = async (req, res) => {
    const user = req.body.user
    // console.log(user.cart);
    const transaction = new Transaction({
        user: user,
        products: user.cart
    })
    User.updateOne({ _id: user._id}, { "$set": {cart: [] } },
    function(err, obj) {
        if (err) return console.error(err)
        else {
            console.log(obj);
        }
    })
    await transaction.save(function (err, transaction) {
        if (err) return console.error(err)
        else {
            res.status(202).json({ transaction: transaction }) 
        }
    })
}

const getTransactions = async (req, res) => {
    const allTransactions = await Transaction.find({})
    res.json(allTransactions)
}

module.exports = { addProductToCart, removeProductFromCart, checkout, getUser, getTransactions }