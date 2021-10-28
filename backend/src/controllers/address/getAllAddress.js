const Address = require('../../models/Address')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Get all address for currently logged in user
// @route     GET /api/v1/address
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const address = await Address.find({ user: req.user._id })

	res.status(200).json({
		success: true,
		data: address
	})
})
