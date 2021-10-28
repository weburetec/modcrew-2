const Product = require('../../../models/Product')
const Review = require('../../../models/Reviews')
const ErrorResponse = require('../../../utils/error-response')
const asyncHandler = require('../../../middleware/async')

// @desc      Delete review from a product
// @route     DELETE /api/v1/products/:id/reviews/:rid
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id)

	if (!product) {
		return next(
			new ErrorResponse(
				`Product could not be found with the id of ${req.params.id}`,
				404
			)
		)
	}

	const review = await Review.findById(req.params.rid)

	if (!review) {
		return next(
			new ErrorResponse(`No review found with the id of ${req.params.rid}`, 404)
		)
	}

	await review.deleteOne()

	res.status(200).json({
		success: true,
		message: `Review with the id of ${req.params.rid} deleted successfully`
	})
})
