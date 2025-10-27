const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true,
    enum: ['weekly', 'fortnightly', 'monthly', 'one-time']
  },
  startDate: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
