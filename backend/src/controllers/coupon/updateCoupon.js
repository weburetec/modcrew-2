const Coupon = require('../../models/Coupon')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Update coupon
// @route     POST /api/v1/coupons
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id)

  if (!coupon) {
    return next(new ErrorResponse(`Something went wrong!`, 500))
  }
  const updates = Object.keys(req.body)

  updates.forEach((update) => (coupon[update] = req.body[update]))

  await coupon.save()

  res.status(200).json({
    success: true,
    data: coupon,
  })
})
