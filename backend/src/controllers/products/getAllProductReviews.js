const Product = require('../../models/Product')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Get all reviews for a product
// @route     GET /api/v1/products/:productId/reviews
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const productId = req.params.id
	const product = await Product.findById(productId)

	if (!product) {
		return next(
			new ErrorResponse(
				`Product could not be found with the id of ${productId}`,
				404
			)
		)
	}

	const reviews = [...product.reviews]

	res.status(201).json({
		success: true,
		data: reviews
	})
})
