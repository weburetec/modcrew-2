const Address = require('../../models/Address')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Update Address
// @route     PUT /api/v1/address/:id
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	req.body.user = req.user._id

	const address = await Address.findById(req.params.id)

	if (!address) {
		return next(new ErrorResponse('Requested address could not be found', 404))
	}

	const updates = Object.keys(req.body)

	updates.forEach((update) => (address[update] = req.body[update]))

	await address.save()

	res.status(200).json({
		success: true,
		data: address
	})
})
