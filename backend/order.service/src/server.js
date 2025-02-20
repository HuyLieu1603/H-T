import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

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
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);

app.get('/', (_, res) => {
  res.send('hello world');
});

app.use(`/api/v3`);

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
