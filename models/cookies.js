const mongoose = require('mongoose');
const { Schema } = mongoose;

const cookieSchema = new Schema({
  cookie: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

cookieSchema.index({
  cookie: 1
}, {
  expireAfterSeconds: 60 * 60 * 24 * 365
});

module.exports = mongoose.model('cookies', cookieSchema);
