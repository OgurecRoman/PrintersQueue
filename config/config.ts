import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  JWT_SECRET: string;
}

const config: Config = {
  PORT: parseInt(process.env.PORT || '3000'),
  DB_NAME: process.env.DB_NAME || 'print_queue_db',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432'),
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret-key',
};

export default config;