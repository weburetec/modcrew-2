const mongoose = require('mongoose')

const availableSize = [
	'xs',
	's',
	'm',
	'l',
	'xl',
	'2xl',
	'3xl',
	'standard',
	'28',
	'30',
	'32',
	'34',
	'36'
]

const VariationSchema = mongoose.Schema(
	{
		product: {
			type: mongoose.Types.ObjectId,
			ref: 'Product',
			required: [true, 'Product id needed to create a product variation']
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'User id needed to create a product variation']
		},
		size: {
			type: String,
			enum: {
				values: availableSize,
				message: '{VALUE} is not supported'
			},
			required: [true, 'Must provide a size for variation']
		},
		sku: {
			type: String,
			required: [true, 'Product variation must have a sku'],
			unique: [true, 'SKU must be unique']
		},
		stockQuantity: {
			type: Number,
			required: [true, 'Must provide a stock quantity']
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('ProductVariation', VariationSchema)
