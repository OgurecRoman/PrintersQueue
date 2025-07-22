import request from 'supertest';
import express, { Express } from 'express';
import { login } from '../../src/controllers/auth';

describe('login function', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.post('/login', login);
  });

  it('should return 400 for invalid input', async () => {
    const res = await request(app)
      .post('/login')
      .send({ password: '' });
    
    expect(res.status).toBe(400);
  });

  it('should return 401 for wrong credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ password: 'wrong' });
    
    expect(res.status).toBe(401);
  });

  it('should return token for valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ password: process.env.AUTH_PASSWORD });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});