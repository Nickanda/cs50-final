const mongoose = require('mongoose');
const { Schema } = mongoose;

const antSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  species: {
    type: String,
    required: true
  },
  caste: {
    type: String,
    required: true
  },
  feignsDeath: {
    type: Boolean,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  lengths: {
    HL: {
      type: Number,
      required: true
    },
    HH: {
      type: Number,
      required: true
    },
    EL: {
      type: Number,
      required: true
    },
    WL: {
      type: Number,
      required: true
    },
    MH: {
      type: Number,
      required: true
    },
    PL: {
      type: Number,
      required: true
    },
    PH: {
      type: Number,
      required: true
    },
    GL: {
      type: Number,
      required: true
    },
    TL: {
      type: Number,
      required: true
    },
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
});

antSchema.index({ species: 1, caste: 1 }, {
  collation: {
    locale: 'en',
    strength: 2
  }
});

module.exports = mongoose.model('ants', antSchema);