const mongoose = require('mongoose')
const ShipRocket = require('./ShipRocket')

const OrderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			required: [true, 'Order must have a user filed'],
			ref: 'User'
		},
		order_id: {
			type: String,
			required: true
		},
		order_date: {
			type: Date,
			required: true
		},
		status: {
			type: String,
			default: 'created'
		},
		pickup_location: {
			type: String
		},
		billing_customer_name: {
			type: String,
			required: true
		},
		billing_last_name: String,
		billing_address: {
			type: String,
			required: true
		},
		shipRocketId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ShipRocket'
		},
		billing_city: { type: String, required: true },
		billing_pincode: { type: Number, required: true },
		billing_state: { type: String, required: true },
		billing_country: { type: String, required: true },
		billing_email: { type: String, required: true },
		billing_phone: { type: String, required: true },
		shipping_is_billing: { type: Boolean, required: true },
		order_items: [
			{
				name: { type: String, required: true },
				sku: { type: String, required: true },
				units: { type: Number, required: true },
				selling_price: { type: Number, required: true },
				tax: { type: Number, required: true },
				hsn: { type: Number, required: true },
				image: String,
				productId:{type:String,default:null}
			}
		],
		payment_method: {
			type: String,
			default: 'Prepaid',
			enum: ['Prepaid', 'COD']
		},
		payment: {
			type: mongoose.Types.ObjectId,
			ref: 'Payment'
		},
		sub_total: {
			type: Number,
			required: true
		},
		total:Number,
		discount:Number,
		coupon:{
			type:String,
			default:""
		},
		length: Number,
		breadth: Number,
		height: Number,
		weight: Number
	},
	{
		timestamps: true
	}
)

OrderSchema.pre('save', function (next) {
	if (!this.billing_last_name) {
		billing_last_name = ''
	}
	next()
})

OrderSchema.statics.setOrderStatus = async function (orderId, status) {
	const order = await this.model('Order').findById(orderId)

	if ((status = 'order_processed')) {
		const user = await this.model('User').findById(this.user)
		const coinsToAdd = Math.floor(this.sub_total / 100)
		await user.addLoyaltyCoins(coinsToAdd)
	}

	order.status = status

	await order.save()
}

OrderSchema.statics.setShiprocketId = async function (orderId, shipId) {
	const order = await this.model('Order').findById(orderId)

	order.shipRocketId = shipId

	await order.save()
}

// Set dimensions in order
OrderSchema.methods.setDimensions = async function (l, b, h, w) {
	const isOkay = (l && b && h && w && true) || false

	if (!isOkay) {
		throw new Error('Length, Breadth, Height and Weight all are required')
	}

	this.length = l
	this.breadth = b
	this.height = h
	this.weight = w
	await this.save()
}

// Create a shiprocket order
OrderSchema.methods.createShiprocketOrder = async function (adminId) {
	if (this.status !== 'payment_captured') {
		throw new Error(`Payment not made for the order of id ${this._id}`)
	}

	if (!this.length || !this.breadth || !this.height || !this.weight) {
		throw new Error(
			`Length, Breadth, Height & Weight are required to place an order`
		)
	}

	await ShipRocket.placeShiprocketOrder(this, adminId)
}

// Cancel an order
OrderSchema.methods.cancelOrder = async function () {
	if (
		this.status !== 'created' &&
		this.status !== 'payment_failed' &&
		this.status !== 'payment_captured' &&
		this.status !== 'order_processing'
	) {
		throw new Error('Order cannot be cancelled')
	}

	if (this.status === 'created' || this.status === 'payment_failed') {
		this.status = 'order_canceled'
	}

	if (this.status === 'payment_captured') {
		const payment = await this.model('Payment').findById(this.payment)
		await payment.initiateRefund()
		// If refund request is successful order status should change automatically
	}

	if (this.status === 'order_processing') {
		// Cancel Order on Shiprocket
		await this.model('ShipRocket').cancelShiprocketOrder(this.shipRocketId)

		// Refund the order amount
		const payment = await this.model('Payment').findById(this.payment)
		await payment.initiateRefund()
	}

	await this.save()
}

module.exports = mongoose.model('Order', OrderSchema)
