import express from 'express';
//import cors from 'cors';
import { sequelize } from './models/index.js';
import router from './routes';

const app = express();

// Middleware
//app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Test route
app.get('/', (req, res) => {
  res.send('Print Queue Management API');
});

// Database connection
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
}).catch((err) => {
  console.error('Database connection error:', err);
});

export default app;