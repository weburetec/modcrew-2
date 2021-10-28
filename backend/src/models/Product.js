const mongoose = require('mongoose')

const availableCatagories = [
  'collectibles',
  'diary',
  'sticker',
  'badge',
  'key-chain',
  'poster',
  'fashion',
  'active-wear',
  'jogger',
  'jersey',
  'top-wear',
  'henley',
  'round-neck',
  'crop-top',
  'bottom-wear',
  'shorts',
  'accessories',
  'cap',
  'bandana',
  'bag',
]

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Product title cannot be empty'],
      maxLength: [50, 'Product title cannot be longer than 50 characters'],
      unique: [true, 'This product title cannot be used'],
    },
    description: {
      type: [String],
      required: [true, 'Description cannot be empty'],
    },
    color: {
      type: String,
      required: true,
    },
    mrp: {
      type: Number,
      required: [true, 'Please provide a MRP'],
    },
    sellingPrice: {
      type: Number,
      required: [true, 'Please provide a selling price price'],
    },
    tax: {
      type: Number,
      required: [true, 'Please include a tax percentage'],
    },
    hsn: {
      type: Number,
      required: [true, 'Product must have an hsn number'],
      validate: {
        validator: (v) => v.toString().length === 8,
        message: 'Please provide valid hsn number',
      },
    },
    category: {
      type: [String],
      enum: availableCatagories,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Please provide a category',
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestSelling: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      required: [true, 'Image URLs must be provided'],
    },
    unitsSold: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Reverse Populate reviews with Virtual
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
  options: {
    sort: { createdAt: '-1' },
    limit: 10,
  },
})

// Reverse Populate variations with virtual
ProductSchema.virtual('variations', {
  ref: 'ProductVariation',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
})

// Cascade delete product variations with product
ProductSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    console.log('variations being removed for the product ' + this._id)
    await this.model('ProductVariation').deleteMany({ product: this._id })
    next()
  }
)

//To update No of Unit Sold

ProductSchema.methods.updateSoldUnits = async function (unit) {
  this.unitsSold += unit
  await this.save()
}

module.exports = mongoose.model('Product', ProductSchema)
