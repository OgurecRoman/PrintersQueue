import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { JwtPayload } from 'jsonwebtoken';

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload;
        }
    }
}
