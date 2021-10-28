const express = require('express')
const createOrder = require('../controllers/order/createOrder')
const createPaymentOrder = require('../controllers/payments/createPaymentOrder')
const getOrder = require('../controllers/order/getOrder')
const addOrderDimensions = require('../controllers/order/addOrderDimensions')
const cancelOrder = require('../controllers/order/cancelOrder')
const getAllOrders = require('../controllers/order/getAllOrders')
const placeShiprocketOrder = require('../controllers/order/placeShiprocketOrder')

const { protect, authorize } = require('../middleware/auth')

const { filter } = require('../middleware/filter')

const router = express.Router()

router
	.route('/')
	.post(protect, createOrder)
	.get(protect, authorize('admin'), filter, getAllOrders)

router.route('/:id').get(protect, getOrder)

router
	.route('/:id/order')
	.post(protect, authorize('admin'), placeShiprocketOrder)

router
	.route('/:id/addDimensions')
	.post(protect, authorize('admin'), addOrderDimensions)

router.route('/:id/cancel').post(protect, cancelOrder)

router.route('/:id/pay').post(protect, createPaymentOrder)

module.exports = router
