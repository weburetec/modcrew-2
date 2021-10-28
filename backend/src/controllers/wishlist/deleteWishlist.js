const Wishlist = require('../../models/Wishlist')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Add products to cart
// @route     DELETE /api/v1/wishlist/:id
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const wishlist = await Wishlist.findById(req.params.id)

	if (!wishlist) {
		return next(
			new ErrorResponse(
				`Wishlist with the id if ${req.params.id} could not be found`,
				404
			)
		)
	}

	await wishlist.deleteOne()

	res.status(200).json({
		success: true,
		message: 'Wishlist deleted successfully'
	})
})
