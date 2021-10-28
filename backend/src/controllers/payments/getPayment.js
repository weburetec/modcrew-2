const Payment = require('../../models/Payment')
const asyncHandler = require('../../middleware/async')
const ErrorResponse = require('../../utils/error-response')

// @desc      Add products to cart
// @route     POST /api/v1/payments/:orderId
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const payment = await Payment.findOne({ id: req.params.orderId }).populate(
		'user'
	)

	if (!payment) {
		return next(
			new ErrorResponse(
				`Payment could not be found with the order id of ${req.params.orderId}`,
				404
			)
		)
	}

	res.status(200).json({
		success: true,
		data: payment
	})
})
