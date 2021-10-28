const Product = require('../../../models/Product')
const ProductVariation = require('../../../models/ProductVariation')
const ErrorResponse = require('../../../utils/error-response')
const asyncHandler = require('../../../middleware/async')

// @desc      Delete variation from a product
// @route     DELETE /api/v1/products/:id/:vid
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

	const variation = await ProductVariation.findById(req.params.vid)

	if (!variation) {
		return next(new ErrorResponse('Requested product variant not found', 404))
	}

	await variation.deleteOne()

	res.status(201).json({
		success: true,
		message: 'Product variation deleted successfully'
	})
})
