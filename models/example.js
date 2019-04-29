const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const exampleSchema = new Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    anoterId: {
      type: Schema.Types.ObjectId,
      ref: 'another',
    },
  },
  { collection: 'example', versionKey: false },
);

const anotherSchema = new Schema({
  exampleId: {
    type: Schema.Types.ObjectId,
    ref: 'example',
  },
  age: {
    type: Number,
  },
});

module.exports = {
  Example: mongoose.model('example', exampleSchema),
  Another: mongoose.model('another', anotherSchema),
};
