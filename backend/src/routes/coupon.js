const express = require('express')
const getCoupons = require('../controllers/coupon/getCoupon')
const createCoupon = require('../controllers/coupon/createCoupon')
const deleteCoupon = require('../controllers/coupon/deleteCoupon')
const updateCoupon = require('../controllers/coupon/updateCoupon')
const verifyCoupon = require('../controllers/coupon/verifyCoupon')

const { protect, authorize } = require('../middleware/auth')
const { filter } = require('../middleware/filter')
const router = express.Router()

router.route('/').get(getCoupons)

router.route('/create').post(protect, authorize('admin'), createCoupon)

router.route('/:id').delete(protect, authorize('admin'), deleteCoupon)

router.route('/:id/update').post(protect, authorize('admin'), updateCoupon)

router.route('/verify/:coupon').get(verifyCoupon)

module.exports = router
