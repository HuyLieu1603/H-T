import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from '../src/configs/connect-db.configs.js';
import rootRoutes from '../src/routes/index.js';

dotenv.config();

const app = express();

//middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4200',
      'http://localhost:3001',
      'http://localhost:8080',
      'http://localhost:5179',
      'http://localhost:1433',
      'http://localhost:5001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);

app.get('/', (_, res) => {
  res.send('hello world');
});

connectDB;

app.use(`/api/v3`, rootRoutes);

//start server

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log('🚀 app.listen ~ PORT:', PORT);
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
