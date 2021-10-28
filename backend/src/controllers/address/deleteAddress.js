const Address = require('../../models/Address')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Delete Address
// @route     DELETE /api/v1/address
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
	const address = await Address.findById(req.params.id)

	if (!address) {
		return next(
			new ErrorResponse(
				`Address could not be found with the id of ${req.params.id}`,
				404
			)
		)
	}

	await address.deleteOne()

	res.status(200).json({
		success: true,
		data: 'Address deleted successfully'
	})
})
