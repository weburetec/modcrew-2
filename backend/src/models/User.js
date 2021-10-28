const crypto = require('crypto')
const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			trim: true,
			required: [true, 'User must have a name'],
			maxLength: [20, 'First name cannot be longer than 20 characters'],
			minLength: 3
		},
		lastName: {
			type: String,
			trim: true,
			maxLength: [20, 'First name cannot be longer than 20 characters'],
			minLength: 3
		},
		age: {
			type: Number,
			required: [true, "Must provide user's age"],
			min: [16, 'User must be at least 16 years old']
		},
		sex: {
			type: String,
			required: true,
			enum: {
				values: ['male', 'female', 'others'],
				message: '{VALUE} is not supported'
			},
			default: 'male'
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			required: [true, 'Must provide an email'],
			validate: [isEmail, 'Please provide a valid email'],
			unique: true
		},
		password: {
			type: String,
			required: [true, 'User must provide a password'],
			minLength: [6, 'Password must be at least 6 characters'],
			select: false
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,
		phone: {
			type: Number,
			validate: {
				validator: (v) => v.toString().length === 10,
				message: 'Please provide valid phone number'
			}
		},
		role: {
			type: String,
			enum: {
				values: ['customer', 'admin', 'superAdmin'],
				message: '{VALUE} role is not supported'
			},
			default: 'customer'
		},
		loyaltyCoins: {
			type: Number,
			default: 0
		},
		membership: {
			type: Boolean,
			default: false
		},
		membershipValidTill: Date
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
)

UserSchema.virtual('addressBook', {
	ref: 'Address',
	localField: '_id',
	foreignField: 'user',
	justOne: false
})

UserSchema.virtual('orders', {
	ref: 'Order',
	localField: '_id',
	foreignField: 'user',
	justOne: false,
	options: {
		sort: { createdAt: -1 },
		limit: 5
	}
})

// Encrypt password with bcrypt
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

// Sign JWT and return
UserSchema.methods.getSignedJWT = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	})
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString('hex')

	// Hash token and set resetPasswordToken field
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex')

	// Set expire
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

	return resetToken
}

UserSchema.methods.addLoyaltyCoins = async function (coins) {
	this.loyaltyCoins += coins
	await this.save()
}

UserSchema.methods.removeLoyaltyCoins = async function (coins) {
	this.loyaltyCoins -= coins
	await this.save()
}

UserSchema.methods.purchaseMembership = async function () {
	if (this.membership) {
		return 'Already have Membership'
	}
	if (this.loyaltyCoins < 10) {
		return 'Insufficent'
	}
	this.membership = true
	this.loyaltyCoins -= 10
	this.membershipValidTill = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
	return 'Purchase Successfull'
}
module.exports = mongoose.model('User', UserSchema)
