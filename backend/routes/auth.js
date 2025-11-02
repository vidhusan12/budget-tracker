const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/signup - Register new user
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Checking if these fields are filled if not send the error message
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Fill all the fields' })
    }

    // Checking if email already exits
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'This Email already exits' })
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save()

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send response
    res.status(201).json({
      message: 'User created successfully',
      token: token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Fill in the missing fields' })
    }

    // Find user by email
    const user = await User.findOne({ email: email });

    // Check if the user exits
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    // Check if password is matched
    if (!isMatch) {
      return res.status(400).json({ message: 'Invaild Password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send response
    res.status(200).json({
      message: 'Login Successfully',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;