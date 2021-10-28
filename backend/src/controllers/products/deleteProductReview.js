const Product = require('../../models/Product')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Delete review from a product
// @route     DELETE /api/v1/products/:productId
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const productId = req.params.id
	const product = await Product.findById(productId)

	if (!product) {
		return next(
			new ErrorResponse(
				`Product could not be found with the id of ${req.params.id}`,
				404
			)
		)
	}

	const filteredReviews = product.reviews.filter((item) => {
		return String(item.reviewerId) !== String(req.body.reviewerId)
	})

	product.reviews = filteredReviews

	await product.save()

	res.status(201).json({
		success: true,
		message: 'Your review is deleted successfully'
	})
})
