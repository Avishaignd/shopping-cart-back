const express = require('express')
const router = express.Router()
const multer = require('multer')
const fileUpload = multer({ dest: 'uploads/' })

const { getProducts, addProduct } = require('../controls/productControl')

router.get("/", getProducts)

router.post("/", fileUpload.single("image"), addProduct)

module.exports = router;
