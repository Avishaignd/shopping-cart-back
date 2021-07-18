const express = require('express')
const router = express.Router()
const { getProducts } = require('../controls/productControl')

router.get("/", getProducts)

module.exports = router;
