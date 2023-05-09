const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');
const SECRET = process.env.JWT_SECRET;
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      }
    });
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Not authorized' });
  };
};

module.exports = { auth };