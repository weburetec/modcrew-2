const User = require('../../models/User')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')
const sendTokenResponse = require('../../utils/send-cookie-response')

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400))
	}

	const user = await User.findOne({ email }).select('+password')

	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401))
	}

	// Check if password matches
	const isMatch = await user.matchPassword(password)

	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials', 401))
	}

	sendTokenResponse(user, 200, res)
})
