import express from 'express';
import { sequelize, setupAssociations } from './models';
import router from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.use('/', router);
app.get('/', (req, res) => {
  res.send('Пожалуйста возьмите меня в RTU IT Lab я буду очень стараться правда т_т');
});

initializeApp();