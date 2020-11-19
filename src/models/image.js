const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  img:
  {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model('Image', ImageSchema);
