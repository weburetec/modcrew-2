const User = require('../../models/User')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Get currently logged in user
// @route     GET /api/v1/auth/me
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id)
		.populate('addressBook')
		.populate('orders')

	res.status(200).json({
		success: true,
		data: user
	})
})
