const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  cookie: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
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

module.exports = mongoose.model('cookies', userSchema);
