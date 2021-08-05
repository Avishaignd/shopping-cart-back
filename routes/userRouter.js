const express = require("express");
const router = express.Router();
const {addProductToCart, removeProductFromCart, checkout, getUser, getTransactions} = require('../controls/userControl')

router.get('/transactions', getTransactions)

router.post('/add', addProductToCart)

router.post('/remove', removeProductFromCart)

router.post('/checkout', checkout)

router.get('/:id', getUser)


module.exports = router