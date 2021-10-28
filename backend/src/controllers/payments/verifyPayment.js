const Payment = require('../../models/Payment')
const Order = require('../../models/Order')
const asyncHandler = require('../../middleware/async')
const Product = require('../../models/Product')
const Coupon = require('../../models/Coupon')

const crypto = require('crypto')
// @desc      Add products to cart
// @route     POST /api/v1/order/:id/pay
// @access    Private

module.exports = asyncHandler(async (req, res, next) => {
  const payment = await Payment.findOne({
    id: req.body.payload.payment.entity.order_id,
  })

  const order = await Order.findById(payment.receipt)

  if (!payment) {
    return res.send('ok')
  }

  const SECRET = String(process.env.RAZORPAY_WEBHOOK_SECRET)

  // verify x-razorpay-signature
  const shasum = crypto.createHmac('sha256', SECRET)
  shasum.update(JSON.stringify(req.body))
  const digest = shasum.digest('hex')

  if (digest === req.headers['x-razorpay-signature']) {
    // Set payment id
    payment.payment_id = req.body.payload.payment.entity.id

    // Check for webhook event
    if (req.body.event === 'payment.captured') {
      const orderItems = order.order_items

      //If coupon is Applied on Order

      if (order.coupon !== '') {
        const coupon = await Coupon.findOne({ coupon: order.coupon })

        await coupon.useCoupon()
      }

      for (var i = 0; i < orderItems.length; i++) {
        const product = await Product.findById(orderItems[i].productId)

        await product.updateSoldUnits(orderItems[i].units)
      }
      payment.status = 'payment_captured'
      order.status = 'payment_captured'
    }

    if (req.body.event === 'payment.failed') {
      payment.status = 'payment_failed'
      order.status = 'payment_failed'
    }

    if (req.body.event === 'refund.created') {
      payment.status = 'refund_initiated'
      order.status = 'refund_initiated'
    }

    if (req.body.event === 'refund.processed') {
      payment.status = 'refund_processed'
      order.status = 'refund_processed'
    }

    if (req.body.event === 'refund.failed') {
      payment.status = 'refund_failed'
      order.status = 'refund_failed'
    }

    await payment.save()
    await order.save()
  }

  res.send('ok')
})
