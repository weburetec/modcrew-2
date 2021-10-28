const Order = require('../../models/Order')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Cancel an order
// @route     POST /api/v1/orders/:id/cancel
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const id = req.params.id

	const order = await Order.findById(id)

	if (!order) {
		return next(
			new ErrorResponse(`Order with the id of ${id} could not be found`, 404)
		)
	}

	if (order.user.toString() !== req.user._id && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(`You are not authorized to access this route`, 401)
		)
	}

	await order.cancelOrder()

	res.status(200).json({
		success: true,
		data: `Order with the id of ${id} cancelled successfully`
	})
})
