const mongoose = require('mongoose')

const AddressSchema = mongoose.Schema(
	{
		customer_name: {
			type: String,
			required: [true, 'Must have a name'],
			maxLength: [40, 'Name on address cannot be longer than 40 characters'],
			minLength: [3, 'Name on address cannot be smaller than 3 characters']
		},
		address: {
			type: String,
			required: [true, 'Must provide an address']
		},
		city: {
			type: String,
			required: [true, 'Address must have a city/town/village']
		},
		pincode: {
			type: String,
			validate: {
				validator: (v) => v.length === 6,
				message: 'Please provide valid pincode'
			}
		},
		state: {
			type: String,
			required: [true, 'Address must have a state']
		},
		country: {
			type: String,
			required: [true, 'Must have a country']
		},
		phone: {
			type: String,
			validate: {
				validator: (v) => v.length === 10,
				message: 'Please provide valid phone number'
			},
			required: [true, 'A phone number must be provided']
		},
		user: {
			type: mongoose.Types.ObjectId,
			required: [true, 'Address must have an user field'],
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Address', AddressSchema)
