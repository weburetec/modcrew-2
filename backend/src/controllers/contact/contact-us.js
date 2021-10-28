const asyncHandler = require('../../middleware/async')
const ErrorResponse = require('../../utils/error-response')
const sendEmail = require('../../utils/send-email')

// @desc      Send contact us email
// @route     POST /api/v1/contact
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
	const { subject, text, from } = req.body

	if (!subject || !text || !from) {
		return next(
			new ErrorResponse(
				'Email subject, text & from are required to send a message'
			)
		)
	}

	const to = 'snehangshu@devsnb.com'

	console.log(subject, text, to, from)

	await sendEmail(subject, text, to, from)

	res.status(200).json({ message: 'Email sent successfully' })
})
