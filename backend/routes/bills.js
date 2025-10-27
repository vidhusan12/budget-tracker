const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// GET all bills
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Create new bill
router.post('/', async (req, res) => {
  const bill = new Bill({
    name: req.body.name,
    amount: req.body.amount,
    dueDate: req.body.dueDate
  });

  try {
    const newBill = await bill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Update bill
router.put('/:id', async (req, res) => {
  try {
    const updatedBill = await Bill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete bill
router.delete('/:id', async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bill deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;