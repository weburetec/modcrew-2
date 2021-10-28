const crypto = require('crypto')
const User = require('../../models/User')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')
const sendResponseToken = require('../../utils/send-cookie-response')

// @desc      Reset password
// @route     GET /api/v1/auth/reset-password/:resettoken
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex')

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() }
	})

	if (!user) {
		return next(new ErrorResponse('Invalid token', 400))
	}

	// Set new password
	user.password = req.body.password
	user.resetPasswordToken = undefined
	user.resetPasswordExpire = undefined

	await user.save()

	sendResponseToken(user, 200, res)
})
