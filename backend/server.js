const connectDB = require('./src/db/connect-db')
const express = require('express')
require('colors')
const cors = require('cors')
const errorHandler = require('./src/middleware/error')
const cookieParser = require('cookie-parser')

const authRoutes = require('./src/routes/auth')
const productRoutes = require('./src/routes/product')
const userRoutes = require('./src/routes/user')
const cartRoutes = require('./src/routes/cart')
const wishlistRoutes = require('./src/routes/wishlist')
const paymentRoutes = require('./src/routes/payments')
const orderRoutes = require('./src/routes/order')
const addressRoutes = require('./src/routes/address')
const couponRoutes = require('./src/routes/coupon')
const contactRoutes = require('./src/routes/contact')

connectDB()
const app = express()
const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV !== 'production') {
	app.use(require('morgan')('dev'))
}

// For development
app.use(cors())

// Parse request body
app.use(express.json())

// Cookie parser
app.use(cookieParser())

app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/cart', cartRoutes)
app.use('/api/v1/wishlist', wishlistRoutes)
app.use('/api/v1/payments', paymentRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/address', addressRoutes) 
app.use('/api/v1/coupons', couponRoutes)
app.use('/api/v1/contact', contactRoutes)
 
// 404 route
app.use('*', (req, res) => {
	res.status(404).json({
		success: false,
		message: 'Requested resource could not be found!'
	})
})

// Error handler middleware
app.use(errorHandler)

const server = app.listen(PORT, () => {
	console.log(
		`> Server started at http://localhost:${PORT} in ${process.env.NODE_ENV}`
			.yellow.bold
	)
})

// Exit the current process if we face any unhandledError
process.on('unhandledRejection', (error) => {
	console.log(`Error ${error.message}`.red)
	// Close server and exit process
	server.close(() => {
		process.exit(1)
	})
})
