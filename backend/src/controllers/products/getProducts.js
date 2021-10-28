const Product = require('../../models/Product')
const ErrorResponse = require('../../utils/error-response')
const asyncHandler = require('../../middleware/async')

// @desc      Get all products
// @route     GET /api/v1/products
// @access    Public

module.exports = asyncHandler(async (req, res, next) => {
  let query

  const keyword = req.query.keyword

  let searchQuery = {}

  if (keyword) {
    searchQuery = {
      title: {
        $regex: String(keyword),
        $options: 'i',
      },
    }
  }

  // copy req.query
  const reqQuery = { ...req.query, ...searchQuery }

  if (!req.user) {
    reqQuery.isPublished = true
  }

  // excluding fields
  const removeFields = ['select', 'sort', 'limit', 'page']
  // loop over removeFields and delete from reqQuery
  removeFields.forEach((param) => delete reqQuery[param])

  if (req.query.category) {
    const category = req.query.category.split(',')
    const modified = category.map((item) => {
      return {
        category: { in: [item] },
      }
    })

    reqQuery['$and'] = modified
  }

  // copy query string
  let queryStr = JSON.stringify(reqQuery)

  // create operators
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in|nin)\b/g,
    (match) => `$${match}`
  )

  // finding resource
  query = Product.find(JSON.parse(queryStr))
    .select('-createdAt -updatedAt -__v')
    .populate({ path: 'variations', select: '_id size sku stockQuantity' })
    .populate({ path: 'reviews', select: '-__v -createdAt -updatedAt' })

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')

    query = query.select(fields)
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')

    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 20
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await Product.countDocuments()

  query = query.skip(startIndex).limit(limit)

  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    }
  }

  // Executing query
  const products = await query

  if (!products || products.length === 0) {
    return next(new ErrorResponse(`No products found`, 404))
  }

  res.status(200).json({
    success: true,
    count: products.length,
    pagination: pagination,
    data: products,
  })
})
