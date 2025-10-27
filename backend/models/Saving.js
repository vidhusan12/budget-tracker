const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

const Savings = mongoose.model('Savings', savingsSchema);

module.exports = Savings;