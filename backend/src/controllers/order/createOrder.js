const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const ErrorResponse = require("../../utils/error-response");
const asyncHandler = require("../../middleware/async");
const generateId = require("../../utils/generateShiprocketId");

// @desc      Create order
// @route     POST /api/v1/orders
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart.items.length === 0 || !cart) {
    return next(new ErrorResponse(`Your cart is empty`, 400));
  }

  const reqBody = {};

  // Defaults
  reqBody.order_items = cart.items;
  reqBody.sub_total = cart.sub_total;
  reqBody.order_date = Date.now();
  reqBody.shipping_is_billing = true;
  reqBody.order_id = generateId();
  reqBody.user = req.user._id;
  reqBody.coupon=cart.coupon;
  reqBody.total=cart.total
  reqBody.discount=cart.discount

  const fields = Object.keys(req.body);

  fields.forEach((field) => {
    reqBody[`billing_${field}`] = req.body[field];
    delete req.body[field];
  });

  const order = await Order.create(reqBody);

  if (!order) {
    return next(new ErrorResponse(`Something went wrong!`, 500));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});
