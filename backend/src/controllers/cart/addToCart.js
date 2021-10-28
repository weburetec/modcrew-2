const Cart = require('../../models/Cart')
const asyncHandler = require('../../middleware/async')
const ErrorResponse = require('../../utils/error-response')

// @desc      Add products to cart
// @route     POST /api/v1/cart
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id

  const { coupon } = req.body

  var discount = 0
  if (coupon) {
    const response = await Cart.verifyCoupon(coupon)
    if (response.error) {
      return next(new ErrorResponse(`${response.error}`, 500))
    }
    discount = response.discount
  }

  if (!req.body.items) {
    req.body.items = []
  }

  req.body.items.forEach((item) => delete item.price)

  let cart = await Cart.findOne({ user: req.body.user })

  if (!cart) {
    cart = await Cart.create(req.body)
  }

  cart.items = req.body.items
  cart.discount = discount
  cart.coupon = !coupon ? '' : coupon

  await cart.save()

  res.status(200).json({
    success: true,
    data: cart,
  })
})
