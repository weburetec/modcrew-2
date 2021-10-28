const Product = require('../../models/Product')
const ErrorResponse = require('../../utils/error-response')
const imageKitAPI = require('../../utils/imageKitAPI')
const asyncHandler = require('../../middleware/async')

// @desc      Update single product
// @route     PATCH /api/v1/products/:id
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const deleteFromBody = ['avgRating', 'reviews', 'user', 'variations']

	deleteFromBody.forEach((item) => delete req.body[item])

	let product = await Product.findById(req.params.id)

	if (!product) {
		return next(
			new ErrorResponse(
				`Product could not be found with the id of ${req.params.id}`,
				404
			)
		)
	}

	if (req.files.length != 0) {
		//delete all old images

		await imageKitAPI.deleteFiles(product.images)

		//upload new images

		const imagesUrls = await imageKitAPI.uploadFiles(req.files)

		//updating new images array

		product.images = imagesUrls
	}

	const updates = Object.keys(req.body)

	updates.forEach((update) => (product[update] = req.body[update]))

	const updatedProduct = await product.save()

	res.status(200).json({
		success: true,
		data: updatedProduct
	})
})
