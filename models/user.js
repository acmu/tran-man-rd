const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      require: true,
    },
    account: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      require: true,
    },
  },
  { collection: 'user', versionKey: false },
);

module.exports = mongoose.model('user', UserSchema);
