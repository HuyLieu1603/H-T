import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from './configs/connect-db.configs.js';
import rootRoutes from './routes/index.js';
import cors from 'cors';

dotenv.config();

const app = express();

// middlewares
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4200',
      'http://localhost:3001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);

app.get('/', (_, res) => {
  res.send('hello world');
});

//connect DB
connectDB;

// routes
// app.request(`/api/v1`, rootRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('🚀 ~ app.listen ~ port:', port);
});

app.use(async (req, res) => {
  try {
    await func(req, res, next);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});