const express = require('express')
const addToCart = require('../controllers/cart/addToCart')
const getCart = require('../controllers/cart/getCart')

const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

router.route('/').get(protect, getCart).post(protect, addToCart)

module.exports = router
