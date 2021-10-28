const User = require('../../models/User')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      DELETE single user
// @route     GET /api/v1/users/:id
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id)

	if (!user) {
		return next(
			new ErrorResponse(`User not found with the id of ${req.params.id}`, 404)
		)
	}

	await user.deleteOne()

	res.status(200).json({
		success: true,
		message: 'User deleted successfully'
	})
})
