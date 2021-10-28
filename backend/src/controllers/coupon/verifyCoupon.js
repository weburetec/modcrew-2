const Coupon = require('../../models/Coupon')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Create coupon
// @route     POST /api/v1/coupon
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
  req.params.coupon = req.params.coupon.toUpperCase()
  const coupon = await Coupon.findOne({ coupon: req.params.coupon })
  console.log(coupon)
  if (!coupon) {
    return next(new ErrorResponse(`No coupon found`, 500))
  }

  const response = await coupon.isValid()

  if (!response.valid) {
    return next(new ErrorResponse(`${response.error}`, 500))
  }

  res.status(200).json({
    success: true,
    discount: coupon.discount,
  })
})
