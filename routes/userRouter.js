const express = require("express");
const router = express.Router();
const {addProductToCart, removeProductFromCart, checkout} = require('../controls/userControl')

router.post('/add', addProductToCart)

router.post('/remove', removeProductFromCart)

router.post('/checkout', checkout)

module.exports = router