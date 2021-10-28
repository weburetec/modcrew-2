const Order = require('../../models/Order')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Place Shiprocket Order
// @route     POST /api/v1/orders/:id/order
// @access    Private/Admin
module.exports = asyncHandler(async (req, res, next) => {
	const id = req.params.id

	const order = await Order.findById(id)

	if (!order) {
		return next(
			new ErrorResponse(`Order with the id of ${id} could not be found`, 404)
		)
	}

	await order.createShiprocketOrder(req.user._id)

	res.status(200).json({
		success: true,
		data: 'Order placed on shiprocket successfully'
	})
})
