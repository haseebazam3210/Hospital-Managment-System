import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';
dotenv.config();
const app = express();
app.use(cors()); app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'MediCare API' }));
app.use('/api/auth', authRoutes); app.use('/api', dataRoutes);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, '../client/dist');
app.use(express.static(dist));
app.get('*', (req, res, next) => req.path.startsWith('/api') ? next() : res.sendFile(path.join(dist, 'index.html'), err => err && res.status(404).send('Build the client first with npm run build.')));
const port = process.env.PORT || 5000;
try {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is missing. Add it to your .env file.');
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => console.log(`MediCare API listening on ${port}`));
} catch (error) { console.error('Startup failed:', error.message); process.exit(1); }
