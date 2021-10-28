const mongoose = require('mongoose')

const CouponSchema = mongoose.Schema(
  {
    limit: {
      type: Number,
      default: 0,
      required: true,
    },
    used: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    coupon: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

CouponSchema.methods.useCoupon = async function () {
  this.used += 1
  await this.save()
}

CouponSchema.methods.isValid = async function () {
  var today = Date.now()
  var expiry = new Date(this.expiryDate).getTime()

  console.log(today, expiry)
  if (expiry < today) {
    return { valid: false, error: 'Coupon Code expired' }
  }
  if (this.limit == this.used) {
    return { valid: false, error: 'Limit Over' }
  }

  return { valid: true, error: '' }
}

module.exports = mongoose.model('couponSchema', CouponSchema)
