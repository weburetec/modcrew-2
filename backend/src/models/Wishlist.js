const mongoose = require('mongoose')

const WishlistSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			required: true
		},
		name: {
			type: String,
			trim: true,
			required: [true, 'Wishlist name must be specified']
		},
		items: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Product'
			}
		],
		totalItems: Number
	},
	{
		timestamps: true
	}
)

WishlistSchema.pre('save', function (next) {
	this.totalItems = this.items.length
	next()
})

module.exports = mongoose.model('Wishlist', WishlistSchema)
