const Product = require('../../models/Product')
const ErrorResponse = require('../../utils/error-response')
const imageKitAPI = require('../../utils/imageKitAPI')
const asyncHandler = require('../../middleware/async')

// @desc      Create single product if doesn't exist or update it
// @route     POST /api/v1/products
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	// add user to req.body
	req.body.user = req.user.id

	const found = await Product.findOne({ title: req.body.title })
	if (found) {
		return next(
			new ErrorResponse(
				'Product already exists with the title of ' + req.body.title,
				400
			)
		)
	}
	if (!req.files) {
		req.files = []
	}
	const imagesUrls = await imageKitAPI.uploadFiles(req.files)

	req.body.images = imagesUrls

	const newProduct = await Product.create(req.body)

	if (!newProduct) {
		return next(new ErrorResponse('Something went wrong', 500))
	}

	res.status(201).json({
		success: true,
		data: newProduct
	})
})
