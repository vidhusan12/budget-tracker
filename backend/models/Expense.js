const mongoose = require('mongoose');

// Define the schema (blueprint)
const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now // If no date provided, use current date
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create the model
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;