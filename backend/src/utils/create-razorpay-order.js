const razorpay = require('./razorpay')
// const { v4: uuidv4 } = require('uuid')

const createOrder = async (amount, receipt) => {
	const options = {
		amount: amount * 100,
		currency: 'INR',
		receipt: String(receipt),
		payment_capture: 1
	}

	const response = await razorpay.orders.create(options)

	return response
}

module.exports = createOrder
