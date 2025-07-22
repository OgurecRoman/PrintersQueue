import express from 'express';
import { sequelize, setupAssociations } from './models';
import router from './routes';
import { authenticateToken } from './middlewares/auth';
import * as authController from './controllers/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/login', authController.login);

app.use(authenticateToken);

app.use('/', router);
app.get('/', (req, res) => {
  res.send('Пожалуйста возьмите меня в RTU IT Lab я буду очень стараться правда т_т');
});

async function initializeApp() {
  try {
    await sequelize.authenticate();
    setupAssociations();
    await sequelize.sync({ alter: true });
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

initializeApp();