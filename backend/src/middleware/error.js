const ErrorResponse = require('../utils/error-response')

const errorHandler = (err, req, res, next) => {
	let error = { ...err }

	error.message = err.message

	// Log to console
	console.log(err.stack.red)

	// Mongoose bad object id
	if (err.name === 'CastError') {
		const message = `Resource could not be found with the id of ${err.value}`
		error = new ErrorResponse(message, 404)
	}

	// Mongoose duplicate key error
	if (err.code === 11000) {
		const message = 'Duplicate field value entered'
		error = new ErrorResponse(message, 400)
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((val) => val.message)
		error = new ErrorResponse(message, 400)
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Something went wrong on the server'
	})
}

module.exports = errorHandler
