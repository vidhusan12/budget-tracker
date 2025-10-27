const express = require('express');
const router = express.Router();
const Income = require('../models/Income');

// GET all incomes
router.get('/', async (req, res) => {
  try {
    const incomes = await Income.find().sort({ createdAt: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Create new income
router.post('/', async (req, res) => {
  const income = new Income({
    amount: req.body.amount,
    description: req.body.description,
    frequency: req.body.frequency
  });

  try {
    const newIncome = await income.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Update income
router.put('/:id', async (req, res) => {
  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete income
router.delete('/:id', async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: 'Income deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;