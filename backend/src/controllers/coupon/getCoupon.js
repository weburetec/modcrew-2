const Coupon = require('../../models/Coupon')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Get coupons
// @route     POST /api/v1/coupons
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.find({})

  if (!coupon) {
    return next(new ErrorResponse(`Something went wrong!`, 500))
  }

  res.status(200).json({
    success: true,
    data: coupon,
  })
})
