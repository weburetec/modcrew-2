const Order = require('../../models/Order')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Set Order Dimensions
// @route     POST /api/v1/orders/:id/addDimensions
// @access    Private/Admin
module.exports = asyncHandler(async (req, res, next) => {
	const { length, breadth, height, weight } = req.body

	const id = req.params.id

	const order = await Order.findById(id)

	if (!order) {
		return next(
			new ErrorResponse(`Order with the id of ${id} could not be found`)
		)
	}

	await order.setDimensions(length, breadth, height, weight)

	res.status(200).json({
		success: true,
		data: 'Dimensions set successfully'
	})
})
