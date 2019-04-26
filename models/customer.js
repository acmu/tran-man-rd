const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      unique: true,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    province: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    createTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'customer',
    versionKey: false,
    // https://www.cnblogs.com/duhuo/p/6232534.html
    timestamps: { createdAt: 'createTime' },
  },
);

module.exports = mongoose.model('customer', CustomerSchema);
