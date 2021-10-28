const asyncHandler = require('./async')
const ErrorResponse = require('../utils/error-response')
// Protect routes
exports.filter = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query }

  const removeFields = ['select', 'sort', 'limit', 'page']

  removeFields.forEach((param) => delete reqQuery[param])

  let queryStr = JSON.stringify(reqQuery)

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in|nin)\b/g,
    (match) => `$${match}`
  )

  req.queryStr = JSON.parse(queryStr)
  next()
})
