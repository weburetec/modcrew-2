const Wishlist = require('../../models/Wishlist')
const asyncHandler = require('../../middleware/async')
const ErrorResponse = require('../../utils/error-response')

// @desc      Add products to cart
// @route     GET /api/v1/wishlist
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	req.body.user = req.user._id

	const wishlists = await Wishlist.find({
		user: req.body.user
	})

	if (!wishlists) {
		return next(new ErrorResponse('No wishlist found for the user', 404))
	}

	res.status(200).json({
		success: true,
		data: wishlists
	})
})
