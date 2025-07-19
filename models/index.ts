import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

export { sequelize };

export default async function initializeModels() {
  const Printer = await import('./printer.js');
  const Job = await import('./job.js');
  const Queue = await import('./queue.js');

  // await sequelize.sync();
  // return sequelize;

  const models = {
    Printer,
    Job,
    Queue,
  };

return models;
}
