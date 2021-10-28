const User = require("../../models/User");
const ErrorResponse = require("../../utils/error-response");
const asyncHandler = require("../../middleware/async");

// @desc      DELETE single user
// @route     GET /api/v1/users/:id
// @access    Private
module.exports = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  const response = await user.purchaseMembership();

  await user.save();

  return res.status(200).json({
    success: true,
    data: response,
  });
});
