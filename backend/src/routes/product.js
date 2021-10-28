const express = require('express')
const createProduct = require('../controllers/products/createProduct')
const getProducts = require('../controllers/products/getProducts')
const getProduct = require('../controllers/products/getProduct')
const updateProduct = require('../controllers/products/updateProduct')
const deleteProduct = require('../controllers/products/deleteProduct')

// Product search
const searchProducts = require('../controllers/products/searchProducts')

// Product Reviews
const addReviewToProduct = require('../controllers/products/reviews/addReviewToProduct')
const getAllProductReviews = require('../controllers/products/reviews/getAllProductReviews')
const deleteProductReview = require('../controllers/products/reviews/deleteProductReview')

// Product Variations
const addProductVariation = require('../controllers/products/variations/addProductVariation')
const deleteProductVariation = require('../controllers/products/variations/deleteProductVariation')
const updateProductVariation = require('../controllers/products/variations/updateProductVariation')

const { protect, authorize, special } = require('../middleware/auth')
const multer = require('../middleware/multer')
const { filter } = require('../middleware/filter')

const router = express.Router()
// @route   /api/v1/products
router
  .route('/')
  .get([special, filter], getProducts)
  .post([protect, multer.array('images')], authorize('admin'), createProduct)

// @route   /api/v1/products/search
router.route('/search').get(searchProducts)

// @route   /api/v1/products/:id
router
  .route('/:id')
  .get(getProduct)
  .delete(protect, authorize('admin'), deleteProduct)
  .put([protect, multer.array('images')], authorize('admin'), updateProduct)

// @route   /api/v1/products/:id/variations
router
  .route('/:id/variations')
  .post(protect, authorize('admin'), addProductVariation)

router
  .route('/:id/variations/:vid')
  .delete(protect, authorize('admin'), deleteProductVariation)
  .put(protect, authorize('admin'), updateProductVariation)

// @route   /api/v1/products/:id/reviews
router
  .route('/:id/reviews')
  .post(protect, addReviewToProduct)
  .get(getAllProductReviews)

// @route   /api/v1/products/:id/reviews/:rid
router
  .route('/:id/reviews/:rid')
  .delete(protect, authorize('admin', 'customer'), deleteProductReview)

module.exports = router
