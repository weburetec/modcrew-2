const Product = require('../../../models/Product')
const Review = require('../../../models/Reviews')
const ErrorResponse = require('../../../utils/error-response')
const asyncHandler = require('../../../middleware/async')

// @desc      Get all reviews for a product
// @route     GET /api/v1/products/:productId/reviews
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id)

	if (!product) {
		return next(
			new ErrorResponse(
				`Product could not be found with the id of ${productId}`,
				404
			)
		)
	}

	const reviews = await Review.find({ product: req.params.id })

	res.status(200).json({
		success: true,
		data: reviews
	})
})
