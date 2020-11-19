const mongoose = require('mongoose');
const { STATUS } = require('../helpers/constants');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    maxlength: 50,
  },
  status: {
    type: String,
    enum: [STATUS.ACTIVE, STATUS.INACTIVE],
    default: STATUS.ACTIVE,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
