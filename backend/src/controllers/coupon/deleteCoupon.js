const Coupon = require('../../models/Coupon')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Delete coupon
// @route     POST /api/v1/coupons
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id)

  if (!coupon) {
    return next(new ErrorResponse(`Something went wrong!`, 500))
  }

  await coupon.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Deleted Succesfully',
  })
})
