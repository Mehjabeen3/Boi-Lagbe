const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  method: {
    type: String,
    require: true,
  },
  cart: [],
  status: {
    type: String,
    required: true,
    default: 'pending',
  },
})

orderSchema.index({ '$**': 'text' })
const orderDetails = mongoose.model('orderDetails', orderSchema)
module.exports = orderDetails
