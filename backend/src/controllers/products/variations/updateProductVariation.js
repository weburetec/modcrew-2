const ProductVariation = require('../../../models/ProductVariation')
const Product = require('../../../models/Product')
const ErrorResponse = require('../../../utils/error-response')
const asyncHandler = require('../../../middleware/async')

// @desc      Update variation for a product
// @route     PUT /api/v1/products/:id/variations/:vid
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

	let foundVariation = await ProductVariation.findById(req.params.vid)

	if (!foundVariation) {
		return next(
			new ErrorResponse(
				`No product variation does not exists with the sku of ${req.body.sku}`,
				400
			)
		)
	}

	const updates = Object.keys(req.body)

	updates.forEach((update) => (foundVariation[update] = req.body[update]))

	foundVariation = await foundVariation.save()

	res.status(201).json({
		success: true,
		data: foundVariation
	})
})
