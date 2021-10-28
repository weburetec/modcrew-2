const User = require('../../models/User')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')
const sendTokenResponse = require('../../utils/send-cookie-response')

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
	const { firstName, lastName, phone, email, password, role, age } = req.body

	const found = await User.findOne({ email: email })

	if (found) {
		return res.status(400).json({
			success: false,
			message: 'User already exists'
		})
	}

	const user = await User.create({
		firstName,
		lastName,
		phone,
		email,
		role,
		password,
		age
	})

	if (!user) {
		return next(
			new ErrorResponse(
				`Something went wrong on our side, please try again later`,
				500
			)
		)
	}

	sendTokenResponse(user, 200, res)
})
