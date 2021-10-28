const Product = require('../../models/Product')
const ErrorResponse = require('../../utils/error-response')

const imageKitAPI = require('../../utils/imageKitAPI')

const asyncHandler = require('../../middleware/async')

// @desc      Create single product
// @route     DELETE /api/v1/products/:id
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id)

	if (!product) {
		return next(new ErrorResponse(`Requested product could not be found`, 404))
	}
	await imageKitAPI.deleteFiles(product.images)
	await product.deleteOne()

	res.status(200).json({
		success: true,
		data: `Product deleted successfully`
	})
})
