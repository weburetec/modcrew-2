const Order = require('../../models/Order')
const Payment = require('../../models/Payment')
const asyncHandler = require('../../middleware/async')
const createRazorpayOrder = require('../../utils/create-razorpay-order')
const ErrorResponse = require('../../utils/error-response')

// @desc      Add products to cart
// @route     POST /api/v1/order/:id/pay
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(
      new ErrorResponse(`Order with the id of ${req.params.id} not found`, 404)
    )
  }

  const amount = order.sub_total

  const payment = await Payment.findOne({ receipt: req.params.id })

  if (!payment) {
    const response = await createRazorpayOrder(amount, order._id)

    if (!response) {
      return next(new ErrorResponse(`Something went wrong`, 500))
    }

    console.log(req.user._id)

    response.user = req.user._id

    const newPayment = await Payment.create(response)
    order.payment = newPayment._id

    await order.save()

    return res.status(201).json({
      success: true,
      data: newPayment,
    })
  }

  order.payment = payment._id

  await order.save()

  res.status(200).json({
    success: true,
    data: payment,
  })
})
