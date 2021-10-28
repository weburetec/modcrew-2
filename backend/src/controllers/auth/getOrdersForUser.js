const Order = require('../../models/Order')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Get all orders for a particular user
// @route     GET /api/v1/me/orders
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	let orders

	orders = await Order.find({ user: req.user._id })

	if (!orders) {
		orders = []
	}

	res.status(200).json({
		success: true,
		data: orders
	})
})
