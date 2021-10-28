const Order = require('../../models/Order')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Create order
// @route     POST /api/v1/orders/:id
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate('payment')

	if (!order) {
		return next(
			new ErrorResponse(
				`Order could not be found with the id of ${req.params.id}`,
				404
			)
		)
	}

	res.status(200).json({
		success: true,
		data: order
	})
})
