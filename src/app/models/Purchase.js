const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sold: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Purchase', PurchaseSchema)
