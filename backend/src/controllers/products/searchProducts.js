const Product = require('../../models/Product')
const asyncHandler = require('../../middleware/async')

// @desc      Search products
// @route     GET /api/v1/products/search/:keyword
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
	const keyword = req.query.keyword

	const query = {
		title: {
			$regex: String(req.query.keyword),
			$options: 'i'
		}
	}

	query.isPublished = true

	const products = await Product.find({ ...query })
		.populate('variations')
		.populate('reviews')

	if (!products || products.length === 0) {
		return res.status(200).json({
			success: true,
			count: 0,
			data: []
		})
	}

	res.status(200).json({
		success: true,
		count: products.length,
		data: products
	})
})
