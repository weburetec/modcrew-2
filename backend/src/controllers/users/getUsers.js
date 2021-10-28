const User = require('../../models/User')
const asyncHandler = require('../../middleware/async')
const ErrorResponse = require('../../utils/error-response')

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private

module.exports = asyncHandler(async (req, res, next) => {
	query = User.find(req.queryStr)

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
	const total = await User.countDocuments()

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
	let users = await query

	if (!users || users.length === 0) {
		users = []
	}
	res.status(200).json({
		success: true,
		count: users.length,
		pagination: pagination,
		data: users
	})
})
