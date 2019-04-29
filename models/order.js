const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      require: true,
    },
    deliveryUserId: {
      type: String,
      require: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    customerId: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      default: '商品库房',
    },
    productCategory: {
      type: String,
    },
  },
  {
    collection: 'order',
    versionKey: false,
    // https://www.cnblogs.com/duhuo/p/6232534.html
    timestamps: true,
  },
);

module.exports = mongoose.model('order', OrderSchema);
