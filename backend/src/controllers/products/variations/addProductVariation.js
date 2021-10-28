const ProductVariation = require('../../../models/ProductVariation')
const Product = require('../../../models/Product')
const ErrorResponse = require('../../../utils/error-response')
const asyncHandler = require('../../../middleware/async')

// @desc      Create variation for a product
// @route     POST /api/v1/products/:id/variations
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id
	req.body.product = req.params.id

	const product = await Product.findById(req.params.id)

	if (!product) {
		return next(
			new ErrorResponse(
				`Product could not be found with the id of ${req.params.id}`,
				404
			)
		)
	}

	const found = await ProductVariation.findOne({ sku: req.body.sku })

	if (found) {
		return next(
			new ErrorResponse(
				`Variation already exists with the sku of ${req.body.sku}`,
				400
			)
		)
	}

	const newVariation = await ProductVariation.create(req.body)

	if (!newVariation) {
		return next(new ErrorResponse(`Something went wrong`, 500))
	}

	res.status(201).json({
		success: true,
		data: newVariation
	})
})
