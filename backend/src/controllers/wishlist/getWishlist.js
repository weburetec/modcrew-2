const Wishlist = require('../../models/Wishlist')
const asyncHandler = require('../../middleware/async')
const ErrorResponse = require('../../utils/error-response')

// @desc      Add products to cart
// @route     GET /api/v1/wishlist/:id
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
	const wishlist = await Wishlist.findById(req.params.id).populate('items')

	if (!wishlist) {
		return next(
			new ErrorResponse(
				`No wishlist found with the id of ${req.params.id}`,
				404
			)
		)
	}

	res.status(200).json({
		success: true,
		data: wishlist
	})
})
