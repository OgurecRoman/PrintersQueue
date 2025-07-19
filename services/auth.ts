// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import config from '../config/config';

// export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, config.JWT_SECRET, (err: any, user: any) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     (req as any).user = user;
//     next();
//   });
// };