const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
  demographic: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
})
cartSchema.index({ '$**': 'text' })
const cartDetails = mongoose.model('cartDetails', cartSchema)
module.exports = cartDetails
