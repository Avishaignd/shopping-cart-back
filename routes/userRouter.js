const express = require("express");
const router = express.Router();
const {addProductToCart} = require('../controls/userControl')

router.post('/add', addProductToCart)

module.exports = router