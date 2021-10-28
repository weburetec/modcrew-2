const Coupon = require('../../models/Coupon')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Create coupon
// @route     POST /api/v1/coupons
// @access    Private

const isCorrect = async function (data) {
  var coupon = data.coupon
  var limit = data.limit
  if (limit == 0) {
    return { allowed: false, error: 'Limit cannot be zero' }  
  }
  var space = /\s/
  if (space.test(coupon)) {
    return { allowed: false, error: 'No spaces Allowed' } 
  }
  if (!coupon.match('^[a-zA-Z0-9]*$')) {
    return { allowed: false, error: 'Must be Alphanumeric' }
  }
  if (coupon[0] == '0') {
    return { allowed: false, error: 'No Leading Zero allowed' }
  }
  return { allowed: true, error: '' }
}

module.exports = asyncHandler(async (req, res, next) => {
  const response = await isCorrect(req.body)
  if (!response.allowed) {
    return next(new ErrorResponse(`${response.error}`, 500))
  }

  console.log(req.body)

  req.body.coupon = req.body.coupon.toUpperCase()

  req.body.expiryDate = new Date(req.body.expiryDate).toISOString()

  const coupon = await Coupon.findOne({ coupon: req.body.coupon })

  if (coupon) {
    return res.json({ error: 'Coupon Already Exsits' })
  }

  const newcoupon = await Coupon.create(req.body)

  if (!newcoupon) {
    return next(new ErrorResponse(`Something went wrong!`, 500))
  }

  res.status(200).json({
    success: true,
    data: newcoupon,
  })
})
