const mongoose = require('mongoose');
const { ORDER_STATUS } = require('../helpers/constants');

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  items: {
    type: [OrderItemSchema],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ORDER_STATUS),
    default: ORDER_STATUS.PENDING,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
