const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  dueDate: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;