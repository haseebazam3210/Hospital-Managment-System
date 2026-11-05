import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const router = Router();

const demoUsers = [
  { id: 'seed-admin', name: 'Admin User', email: 'admin@medicare.com', password: bcrypt.hashSync('admin123', 12), role: 'admin' },
  { id: 'seed-patient', name: 'John Carter', email: 'patient@medicare.com', password: bcrypt.hashSync('patient123', 12), role: 'patient' },
];

const issueToken = (user) => jwt.sign({ id: user._id || user.id, name: user.name, role: user.role }, process.env.JWT_SECRET || 'demo-secret-key-very-long', { expiresIn: '7d' });

const findUserByEmail = async (email) => {
  const value = String(email || '').trim().toLowerCase();
  if (value === 'admin@medicare.com' || value === 'patient@medicare.com') {
    return demoUsers.find((user) => user.email.toLowerCase() === value);
  }
  return User.findOne({ email: value });
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'admin' } = req.body;

    if (!name?.trim() || !email || !password || password.length < 8) {
      return res.status(400).json({ message: 'Please enter a valid name, email, and password (8+ characters).' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await findUserByEmail(normalizedEmail);
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    if (process.env.MONGODB_URI) {
      const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: await bcrypt.hash(password, 12),
        role,
      });
      return res.status(201).json({ token: issueToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }

    const user = { id: `local-${Date.now()}`, name: name.trim(), email: normalizedEmail, password: await bcrypt.hash(password, 12), role };
    demoUsers.push(user);
    return res.status(201).json({ token: issueToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Could not create account.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }

    return res.json({
      token: issueToken(user),
      user: { id: user._id || user.id, name: user.name, email: user.email, role: user.role || 'admin' },
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to sign in right now.' });
  }
});

export default router;
