const express = require("express");
const router = express.Router();
const {addProductToCart, removeProductFromCart} = require('../controls/userControl')

router.post('/add', addProductToCart)

router.post('/remove', removeProductFromCart)

module.exports = router