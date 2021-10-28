const Product = require('../../../models/Product')
const Review = require('../../../models/Reviews')
const ErrorResponse = require('../../../utils/error-response')
const asyncHandler = require('../../../middleware/async')

// @desc      Add review to a product
// @route     POST /api/v1/products/:productId/reviews
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	req.body.product = req.params.id
	req.body.user = req.user._id
	req.body.name = `${req.user.firstName} ${req.user.lastName || ''}`

	const product = await Product.findById(req.params.id)

	if (!product) {
		return next(
			new ErrorResponse(
				`Product could not be found with the id of ${req.params.id}`,
				404
			)
		)
	}

	let review = await Review.findOne({
		user: req.user._id,
		product: req.body.product
	})

	if (!review) {
		review = await Review.create(req.body)

		if (!review) {
			return next(new ErrorResponse('Something went wrong', 500))
		}

		return res.status(201).json({
			success: true,
			data: review
		})
	}

	const updates = Object.keys(req.body)

	updates.forEach((update) => (review[update] = req.body[update]))

	review = await review.save()

	res.status(201).json({
		success: true,
		data: review
	})
})
