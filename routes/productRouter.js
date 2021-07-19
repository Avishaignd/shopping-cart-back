const express = require('express')
const router = express.Router()
const multer = require('multer')
const fileUpload = multer({ dest: 'uploads/' })

const { getProducts, AddProduct } = require('../controls/productControl')

router.get("/", getProducts)

router.post("/", AddProduct)

module.exports = router;
