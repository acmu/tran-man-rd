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
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { collection: 'customer', versionKey: false },
);

module.exports = mongoose.model('customer', CustomerSchema);
