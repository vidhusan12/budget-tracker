const express = require('express');
const router = express.Router();
const Savings = require('../models/Saving');

// GET savings (returns single document)
router.get('/', async (req, res) => {
  try {
    let savings = await Savings.findOne();

    // If no savings document exists, create one with 0
    if (!savings) {
      savings = new Savings({ amount: 0 });
      await savings.save();
    }

    res.json(savings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update savings amount
router.put('/', async (req, res) => {
  try {
    let savings = await Savings.findOne();

    if (!savings) {
      // Create if doesn't exist
      savings = new Savings({ amount: req.body.amount });
    } else {
      // Update existing
      savings.amount = req.body.amount;
    }

    await savings.save();
    res.json(savings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;