const mongoose = require('mongoose')
const instance = require('../utils/razorpay')

const PaymentSchema = mongoose.Schema(
	{
		id: String,
		payment_id: String,
		amount: Number,
		amount_paid: Number,
		amount_due: Number,
		currency: String,
		receipt: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'Order'
		},
		status: String,
		attempts: Number,
		notes: Array,
		created_at: Date,
		user: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
)

// PaymentSchema.pre('save', async function (next) {
// 	console.log('It ran')
// 	const order = await this.model('Order').findById(this.receipt)

// 	if (this.status === 'payment_captured') {
// 		order.status = 'payment_captured'
// 	}

// 	if (this.status === 'payment_failed') {
// 		order.status = 'payment_failed'
// 	}

// 	if (this.status === 'refund_initiated') {
// 		order.status === 'refund_initiated'
// 	}

// 	if (this.status === 'refund_processed') {
// 		order.status === 'refund_processed'
// 	}

// 	if (this.status === 'refund_failed') {
// 		order.status === 'refund_failed'
// 	}

// 	await order.save()

// 	next()
// })

PaymentSchema.methods.initiateRefund = async function () {
	const amount = this.amount
	const paymentId = this.payment_id

	const response = await instance.payments.refund(paymentId, { amount })

	return response
}

module.exports = mongoose.model('Payment', PaymentSchema)
