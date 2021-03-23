import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user';
import { validationResult } from 'express-validator';

export const getUsers = (req: Request, res: Response) => {

    const { page = '1', limit } = req.query;

    res.json({
        msg:'GET - users',
        page,
        limit
    });
}

export const postUsers = async (req: Request, res: Response) => {

    const { name, email, password, role } = req.body;
    const user = new User({
        name, email, password, role
    });

    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.json({
        user
    });
}

export const putUsers = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg:'PUT - users',
        id
    });
}

export const deleteUsers = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg:'DELETE - users',
        id
    });
}