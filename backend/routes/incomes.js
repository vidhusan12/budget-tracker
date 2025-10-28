const express = require('express');
const router = express.Router();
const Income = require('../models/Income');
const authMiddleware = require('../middleware/auth');

// GET all incomes
router.get('/', authMiddleware, async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Create new income
router.post('/', authMiddleware, async (req, res) => {
  const income = new Income({
    amount: req.body.amount,
    description: req.body.description,
    frequency: req.body.frequency,
    userId: req.user.id
  });

  try {
    const newIncome = await income.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Update income
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: 'Income not found' })
    }

    if (income.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }


    income.amount = req.body.amount;
    income.description = req.body.description;
    income.frequency = req.body.frequency;
    income.startDate = req.body.startDate;
    await income.save();

    res.json(income);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete income
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    if (income.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await income.deleteOne();
    res.json({ message: 'Income deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;