const Cart = require('../../models/Cart')
const Wishlist = require('../../models/Wishlist')
const asyncHandler = require('../../middleware/async')

// @desc      Add products to cart
// @route     POST /api/v1/wishlist
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
	req.body.user = req.user._id

	let wishlist = await Wishlist.findOne({
		user: req.body.user,
		name: req.body.name
	})

	if (!wishlist) {
		wishlist = await Wishlist.create(req.body)
	}

	wishlist.items = req.body.items

	await wishlist.save()

	res.status(200).json({
		success: true,
		data: wishlist
	})
})
