const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from headers
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extract token (remove "Bearer " prefix)
  const token = authHeader.split(' ')[1];

  // Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Attach user to request
  req.user = { id: decoded.userId };

  // Call next() to continue
  next();
};

module.exports = authMiddleware;