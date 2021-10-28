const User = require('../../models/User')

// @desc      Update user
// @route     PATCH /api/v1/users/:id
// @access    Private
module.exports = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: 'Update user'
	})
}
