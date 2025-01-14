import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import connectDB from './configs/connect-db.configs.js';
import rootRoutes from './routes/index.js';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

const app = express();

//middlewares
app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4200',
      'http://localhost:3001',
      'http://localhost:8080',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);

app.get('/', (_, res) => {
  res.send('hello world');
});

//conect db
connectDB();

//swagger

// Cấu hình Swagger

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Service API',
      version: '1.0.0',
      description: 'API documentation for Product Service',
    },
    servers: [
      { url: 'http://localhost:8080/api/v1', description: 'Local server' },
    ],
  },
  apis: ['./src/routes/*.js'], // Đường dẫn tới các file có định nghĩa Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//routes
app.use(`/api/v1`, rootRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('🚀 ~ app.listen ~ port:', port);
  console.log(`📚 Swagger UI available at http://localhost:${port}/swagger`);
});

app.use(async (req, res) => {
  try {
    await func(req, res, next);
  } catch (error) {
    return res.status(500).json({
      messase: error.messase,
      success: false,
    });
  }
});
