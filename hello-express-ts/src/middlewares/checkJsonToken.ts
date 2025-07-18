import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const checkJsonToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
         res.status(401).json({ message: 'Missing token in Authorization header' });
         return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        next();
    } catch (err) {
         res.status(403).json({ message: 'Invalid or expired token' });
         return;
    }
};
