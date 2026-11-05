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
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', service: 'MediCare API', database: mongoose.connection.readyState === 1 ? 'connected' : 'demo-mode' })
);
app.use('/api/auth', authRoutes);
app.use('/api', dataRoutes);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, '../client/dist');
app.use(express.static(dist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(dist, 'index.html'), () => {
    if (!res.headersSent) res.status(404).send('Build the client first with npm run build.');
  });
});

const port = Number(process.env.PORT || 5000);

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB Atlas connected successfully.');
    } catch (error) {
      console.warn('MongoDB connection failed. Running in demo mode:', error.message);
    }
  } else {
    console.warn('No MONGODB_URI provided. Running in demo mode with fallback data.');
  }

  app.listen(port, () => {
    console.log(`MediCare API listening on http://localhost:${port}`);
  });
}

start();
