const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/**
 * 
 * @route POST /api/user/login
 * @desc Login
 * @access Public 
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name
    });
  } else {
    res.status(400).json({ message: 'Incorrect email or password' });
  }
};
/**
 * 
 * @route POST /api/user/register
 * @desc Registration
 * @access Public 
 */
const register = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const existedUser = await prisma.user.findFirst({
    where: {
      email
    }
  });
  if (existedUser) {
    return res.status(400).json({ message: 'User already exist' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  });
  const secret = process.env.JWT_SECRET;
  if (user && secret) {
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      token: jwt.sign({ id: user.id }, secret, { expiresIn: '10d' })
    });
  } else {
    res.status(400).json({ message: 'Can\'t create user' });
  }
};
const current = async (req, res) => {
  res.send('current');
};
module.exports = { login, register, current };