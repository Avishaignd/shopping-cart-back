const express = require('express')
const router = express.Router()
const { login } = require('../controls/authControl')

router.post('/google', login)

module.exports = router