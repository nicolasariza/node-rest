import { Request, Response, NextFunction } from 'express';

export const validateRole = (req:Request, res:Response, next:NextFunction) => {
    
    if(!req.user){
        return res.status(500).json({
            msg:'request doesn`t have the user property'
        })
    }

    const { role, name } = req.user;

    if( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${name} doesn't have admin role`
        })
    }

    next();
}