const Cart = require('../../models/Cart')
const asyncHandler = require('../../middleware/async')

// @desc      Add products to cart
// @route     GET /api/v1/cart
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const cart = await Cart.findOne({ user: req.user._id })

	if (!cart) {
		return res.status(200).json({
			success: true,
			data: []
		})
	}

	res.status(200).json({
		success: true,
		data: cart
	})
})
