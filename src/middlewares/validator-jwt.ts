import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface IPayload {
    uid: string;
}

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'jwt doesn`t exist'
        });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRETKEY!) as IPayload;
        const user = await User.findById(payload.uid);
        if(!user || !user.state){
            return res.status(401).json({
                msg: 'User doesn`t exist'
            });
        }
        req.user = user; 
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'jwt invalid'
        });
    }
}
