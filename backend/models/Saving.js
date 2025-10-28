const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Savings = mongoose.model('Savings', savingsSchema);

module.exports = Savings;