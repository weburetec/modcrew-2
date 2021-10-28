const mongoose = require('mongoose')
const Coupon = require('./Coupon')
const CartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          required: [true, 'Product id is required to add it to cart'],
        },
        units: {
          type: Number,
          required: [true, 'A quantity must be set for adding product to cart'],
          max: [10, 'Cannot buy more than 10 of the same product'],
          min: [1, 'Quantity cannot be less than 1'],
        },
        image: String,
        name: String,
        tax: Number,
        hsn: Number,
        sku: String,
        selling_price: Number,
        total: Number,
      },
    ],
    sub_total: Number,
    total: Number,
    discount: {
      type: Number,
      default: 0,
    },
    coupon: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

CartSchema.statics.verifyCoupon = async function (coupon) {
  const coupon_details = await Coupon.findOne({ coupon: coupon })

  if (!coupon_details) {
    return { error: 'Coupon is not valid' }
  }
  if (coupon_details.limit == coupon_details.used) {
    return { error: 'Coupon Limit is Over' }
  }

  var expiryTime = new Date(coupon_details.expiryDate).getTime()
  var now = new Date().getTime()

  if (expiryTime < now) {
    return { error: 'Coupon is Expired' }
  }

  return { discount: coupon_details.discount }
}

CartSchema.pre('save', async function (next) {
  let sub_total = 0

  let memberShipDiscount = 3

  const user = await this.model('User').findOne({ _id: this.user })

  for (let index = 0; index <= this.items.length - 1; index++) {
    const product = await this.model('Product')
      .findOne({
        _id: String(this.items[index].productId),
        isPublished: true,
      })
      .select('title sellingPrice hsn tax images variations')
      .populate('variations')

    if (!product) {
      throw new Error(
        `Product with the id of ${this.items[index].productId} could not be found`
      )
    }

    const variation = product.variations.find((item) => {
      return item.sku === this.items[index].sku
    })

    if (!variation) {
      throw new Error(
        `Product variant with the sku of ${this.items[index].sku} could not be found`
      )
    }

    if (variation.stockQuantity < this.items[index].units) {
      throw new Error('Cannot add more units than available product units')
    }

    this.items[index].name = product.title
    this.items[index].selling_price = product.sellingPrice
    this.items[index].total =
      this.items[index].selling_price * this.items[index].units
    this.items[index].hsn = product.hsn
    this.items[index].tax = product.tax
    this.items[index].image = product.images[0]

    sub_total += this.items[index].total
  }

  if (this.items.length === 0) {
    this.sub_total = 0
    next()
  }

  this.total = sub_total

  //First Membership Benefits

  if (user.membership) {
    this.discount += (this.total * memberShipDiscount) / 100
  }

  //Then Coupon Discount if Added otherwise 0

  this.sub_total = this.total - this.discount

  next()
})

module.exports = mongoose.model('Cart', CartSchema)
