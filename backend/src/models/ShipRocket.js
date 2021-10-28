const mongoose = require('mongoose')
const axios = require('axios')
const { getToken } = require('../utils/generate-shirocket-token')

const ShiprocketSchema = mongoose.Schema(
	{
		order_id: {
			type: String,
			required: true
		},
		shipment_id: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true
		},
		onboarding_completed_now: {
			type: Number
		},
		awb_code: {
			type: String
		},
		courier_company_id: {
			type: String
		},
		courier_name: {
			type: String
		},
		order: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'Order'
		},
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

ShiprocketSchema.statics.placeShiprocketOrder = async function (
	order,
	adminId
) {
	if (!order.billing_last_name) {
		order.billing_last_name = ''
	}
	const token = await getToken()
	try {
		const response = await axios.post(
			'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
			order,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}
			}
		)
		response.data.order = order._id
		response.data.user = adminId
		const shipOrder = await this.model('ShipRocket').create(response.data)
		await this.model('Order').setShiprocketId(order._id, shipOrder._id)
		await this.model('Order').setOrderStatus(order._id, 'order_processing')
		return shipOrder
	} catch (error) {
		throw new Error('Unable to create shiprocket order')
	}
}

ShiprocketSchema.statics.cancelShiprocketOrder = async function (shipId) {
	const token = await getToken()

	const shiprocketOrder = await this.model('ShipRocket').findById(shipId)

	try {
		const response = await axios.post(
			'https://apiv2.shiprocket.in/v1/external/orders/cancel',
			{ ids: [shiprocketOrder.order_id] },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}
			}
		)

		shiprocketOrder.status = 'CANCELED'

		await shiprocketOrder.save()

		return response.data
	} catch (error) {
		throw new Error('Unable to cancel the order')
	}
}

module.exports = mongoose.model('ShipRocket', ShiprocketSchema)
