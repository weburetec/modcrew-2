const Address = require('../../models/Address')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Add address
// @route     POST /api/v1/address
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	req.body.user = req.user._id

	// Final route logic
	// const address = await Address.create(req.body)

	// Don't keep it in the final version
	let address = await Address.findOne({ user: req.user._id })

	if (!address) {
		address = await Address.create(req.body)
	}

	const updates = Object.keys(req.body)

	updates.forEach((update) => {
		address[update] = req.body[update]
	})

	address = await address.save()

	if (!address) {
		return next(new ErrorResponse('Something went wrong', 500))
	}

	res.status(200).json({
		success: true,
		data: address
	})
})
