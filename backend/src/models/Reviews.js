const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.ObjectId,
			required: [true, 'Must provide a reviewer id']
		},
		name: String,
		product: {
			type: mongoose.Types.ObjectId,
			required: [true, 'Review must have a a product id'],
			ref: 'Product'
		},
		rating: {
			type: Number,
			required: [true, 'Must provide a rating number'],
			max: [5, 'Rating cannot exceed 5'],
			min: [1, 'Minimum accepted rating is 1']
		},
		title: {
			type: String,
			required: [true, 'A title must be provided for adding a review'],
			maxLength: [40, 'Title cannot exceed 40 characters']
		},
		body: {
			type: String,
			required: [true, 'A body must be provided for adding a review'],
			minLength: [5, 'The review body must at least have 5 characters'],
			maxLength: [500, 'Body cannot exceed 500 characters']
		}
	},
	{
		timestamps: true
	}
)

// Static method to avg product rating
ReviewSchema.statics.getAverageRating = async function (productId) {
	const aggregate = await this.aggregate([
		{
			$match: {
				product: productId
			}
		},
		{
			$group: {
				_id: '$product',
				avgRating: { $avg: '$rating' }
			}
		}
	])

	try {
		await this.model('Product').findByIdAndUpdate(productId, {
			avgRating: aggregate[0].avgRating.toFixed(2)
		})
	} catch (error) {
		console.log(error)
	}
}

// Call getAverageRating after save
ReviewSchema.post('save', function () {
	this.constructor.getAverageRating(this.product)
})

// Call getAverageRating before delete
ReviewSchema.pre('deleteOne', { document: true, query: false }, function () {
	this.constructor.getAverageRating(this.product)
})

module.exports = mongoose.model('Review', ReviewSchema)
