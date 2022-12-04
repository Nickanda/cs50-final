const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

userSchema.index({ username: 1 }, {
  collation: {
    locale: 'en',
    strength: 2
  }
});

module.exports = mongoose.model('users', userSchema);