import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const PASSWORD = process.env.AUTH_PASSWORD;

export const login = async (req: Request, res: Response) => {
    const { password } = req.body;
    
    if (!password){
        return res.status(400).json({ 
                message: 'password are required',
                received: req.body
        });
    }

    if (password !== PASSWORD) {
        return res.status(401).json({ error: 'Неверные учетные данные' });
    }

    const token = jwt.sign(
        { role: 'user' },
        JWT_SECRET!,
        { expiresIn: "1h" }
    );

    res.json({ token });
};