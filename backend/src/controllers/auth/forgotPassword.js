const User = require('../../models/User')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')
const sendEmail = require('../../utils/send-email')

// @desc      Forgot Password
// @route     POST /api/v1/auth/forgot-password
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email })

	if (!user) {
		return next(new ErrorResponse('User not found', 404))
	}

	const resetToken = user.getResetPasswordToken()

	await user.save({ validateBeforeSave: false })

	// Create reset url
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/auth/reset-password/${resetToken}`

	const message = `You are receiving this email because you (or someone else) has requested the reset of your account password. Please click on this link to change your account password: \n\n ${resetUrl} `

	const subject = 'Password Reset'

	try {
		await sendEmail(subject, text, user.email, 'noreply@modcrew.com')

		res.status(200).json({
			success: true,
			data: 'Email sent'
		})
	} catch (error) {
		console.log(error)
		user.resetPasswordToken = undefined
		user.resetPasswordExpire = undefined
		await user.save({ validateBeforeSave: false })
		return next(new ErrorResponse('Email could not be sent', 500))
	}
})
