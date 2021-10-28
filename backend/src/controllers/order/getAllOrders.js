const Order = require('../../models/Order')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Create order
// @route     GET /api/v1/orders
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	// finding resource
	query = Order.find(req.queryStr)
		.select('-createdAt -updatedAt -__v')
		.populate({ path: 'user' })
		.populate({ path: 'shipRocketId' })
		.populate({ path: 'payment' })

	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ')

		query = query.select(fields)
	}

	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ')

		query = query.sort(sortBy)
	} else {
		query = query.sort('-createdAt')
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1
	const limit = parseInt(req.query.limit, 10) || 20
	const startIndex = (page - 1) * limit
	const endIndex = page * limit
	const total = await Order.countDocuments()

	query = query.skip(startIndex).limit(limit)

	const pagination = {}

	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit: limit
		}
	}

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit: limit
		}
	}

	// Executing query
	let orders = await query

	if (!orders || orders.length === 0) {
		orders = []
	}

	res.status(200).json({
		success: true,
		count: orders.length,
		pagination: pagination,
		data: orders
	})
})
