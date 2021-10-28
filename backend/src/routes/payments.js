const express = require('express')
const verifyPayment = require('../controllers/payments/verifyPayment')
const getPayment = require('../controllers/payments/getPayment')

const { protect } = require('../middleware/auth')

const router = express.Router()

router.route('/verify').post(verifyPayment)

router.route('/:orderId').get(protect, getPayment)

module.exports = router
