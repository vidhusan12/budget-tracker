const express = require('express');
const router = express.Router();
const Savings = require('../models/Saving');
const authMiddleware = require('../middleware/auth');

// GET savings (returns single document)
router.get('/', authMiddleware, async (req, res) => {
  try {
    let savings = await Savings.findOne({ userId: req.user.id });

    // If no savings document exists, create one with 0
    if (!savings) {
      savings = new Savings({ amount: 0, userId: req.user.id });
      await savings.save();
    }

    res.json(savings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update savings amount
router.put('/', authMiddleware, async (req, res) => {
  try {
    const saving = await Savings.findOne({ userId: req.user.id }); 

    if (!saving) {
      return res.status(404).json({ message: 'Saving not found' });
    }


    saving.amount = req.body.amount;

    await saving.save();

    res.json(saving);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;