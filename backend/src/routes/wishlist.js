const express = require('express')
const addToWishlist = require('../controllers/wishlist/addToWishlist')
const deleteWishlist = require('../controllers/wishlist/deleteWishlist')
const getWishlist = require('../controllers/wishlist/getWishlist')
const getWishlists = require('../controllers/wishlist/getWishlists')

const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

router.route('/').get(protect, getWishlists).post(protect, addToWishlist)

router.route('/:id').get(getWishlist).delete(protect, deleteWishlist)

module.exports = router
