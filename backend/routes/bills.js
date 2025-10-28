const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const authMiddleware = require('../middleware/auth');

// GET all bills
router.get('/', authMiddleware, async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Create new bill
router.post('/', authMiddleware, async (req, res) => {
  const bill = new Bill({
    name: req.body.name,
    amount: req.body.amount,
    dueDate: req.body.dueDate,
    userId: req.user.id
  });

  try {
    const newBill = await bill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Update bill
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' })
    }

    if (bill.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    bill.name = req.body.name;
    bill.amount = req.body.amount;
    bill.dueDate = req.body.dueDate;
    await bill.save();

    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete bill
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    if (bill.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await bill.deleteOne();
    res.json({ message: 'Bill deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;