import { Request, Response, NextFunction } from 'express';

export const isAdminRole = (req:Request, res:Response, next:NextFunction) => {
    
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

export const validateRole = ( ...roles: string[] ) => {
    return (req:Request, res:Response, next:NextFunction) => {
        if(!req.user){
            return res.status(500).json({
                msg:'request doesn`t have the user property'
            })
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg:`user must contain one of these roles ${roles}`
            })
        }

        next()
    }
}